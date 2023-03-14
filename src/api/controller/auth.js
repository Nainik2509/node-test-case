const bcrypt = require("bcryptjs");
const {
  OK,
  CREATED,
  RECORD_CREATED,
  RECORDS_FOUND,
  RECORD_UPDATED,
  LOGOUT,
  TOKEN_EXPIRED,
  OTP_VERIFY,
  VERIFY_MAIL,
  VERIFY_PHONE,
  GATEWAY_TIMEOUT,
  NO_RECORD_FOUND,
  BAD_REQUEST,
  INVALID_CREDENTIALS,
  NOT_FOUND,
  OTP_SEND,
} = require("../../utils/constants");

const FindByIdModelUtilities = require("../../utils/FindByIdModelUtils");
const APIError = require("../../utils/APIError");
const Utilities = require("../../utils/util");
const User = require("../models/user");

var utils = new Utilities();
var byIdUtils = new FindByIdModelUtilities();

exports.registerUser = async (req, res, next) => {
  try {
    if (req.body.emailInfo) req.body.email = req.body.emailInfo.emailId;
    var objModel = new User(req.body);
    return await objModel.save().then(
      async (savedObject) => {
        // if (savedObject && !savedObject.emailInfo.isVerified) {
        //   utils.handleSendOtp(savedObject, VERIFY_MAIL, User);
        // }
        // if (savedObject && !savedObject.phoneNo.isVerified) {
        //   utils.handleSendOtp(savedObject, VERIFY_PHONE, User);
        // }
        var user = await User.findById({ _id: savedObject._id })
          .populate(req.body.populate)
          .exec();
        user = user.transform();

        return res
          .status(CREATED)
          .json({ data: user, code: OK, message: RECORD_CREATED });
      },
      async (err) => {
        throw await utils.checkDuplication(err);
      }
    );
  } catch (error) {
    return next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const savedObject = await User.ValidateUserAndGenerateToken(
      req.body,
      req.body.populate
    );

    // if (utils.validateEmail(req.body.username)) {
    //   if (!savedObject.emailInfo.isVerified) {
    //     utils.handleSendOtp(savedObject, VERIFY_MAIL, User);
    //   }
    // } else {
    //   if (!savedObject.phoneNo.isVerified) {
    //     utils.handleSendOtp(savedObject, VERIFY_PHONE, User);
    //   }
    // }

    return res
      .status(CREATED)
      .json({ data: savedObject, code: OK, message: RECORDS_FOUND });
  } catch (err) {
    return next(err);
  }
};

exports.otpverify = async (req, res, next) => {
  try {
    const { code, sentTo } = req.body;
    const data = await utils.OtpVerify(code, sentTo, User);
    if (!data) {
      return res
        .status(OK)
        .json({ code: GATEWAY_TIMEOUT, message: TOKEN_EXPIRED });
    }
    const user = await byIdUtils.userById(data._id);

    return res
      .status(CREATED)
      .json({ data: user, code: OK, message: OTP_VERIFY });
  } catch (err) {
    return next(err);
  }
};

exports.forgotpassword = (req, res, next) => {
  try {
    const { username } = req.body;
    var findUser = {};
    var temp = "";
    if (utils.validateEmail(username)) {
      findUser = { "emailInfo.emailId": username };
      temp = VERIFY_MAIL;
    } else {
      findUser = { "phoneNo.mobile": username };
      temp = VERIFY_PHONE;
    }
    User.findOne(findUser).then(async (userFound) => {
      if (!userFound) {
        return await res
          .status(OK)
          .json({ code: NOT_FOUND, message: NO_RECORD_FOUND });
      }
      utils.handleSendOtp(userFound, temp, User).then(() => {
        userFound = userFound.transform();
        return res
          .status(CREATED)
          .json({ data: userFound, code: OK, message: OTP_SEND });
      });
    });
  } catch (err) {
    return next(err);
  }
};

exports.setPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    // var findUser = {
    //   $or: [{ "emailInfo.emailId": username }, { "phoneNo.mobile": username }]
    // };
    const data = await User.findById(req.user._id);
    if (!data) {
      return res.status(OK).json({
        message: NO_RECORD_FOUND,
        code: NOT_FOUND,
      });
    }
    data.password = newPassword;
    data.save().then((userUpdate) => {
      userUpdate = userUpdate.transform();
      return res.status(OK).json({
        data: userUpdate,
        message: RECORD_UPDATED,
        code: OK,
      });
    });
  } catch (err) {
    return next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if (req.user) {
    const data = await bcrypt.compare(currentPassword, req.user.password);
    if (!data) {
      return res.status(OK).json({
        message: INVALID_CREDENTIALS,
        code: BAD_REQUEST,
      });
    }
    if (data) {
      req.user.password = newPassword;
      req.user
        .save()
        .then((data) => {
          data = data.transform();
          return res.status(OK).json({
            data: data,
            message: RECORD_UPDATED,
            code: OK,
          });
        })
        .catch((error) => {
          new APIError({
            errors: [error],
            message: NO_RECORD_FOUND,
            code: NOT_FOUND,
          });
        });
    }
  }
};

exports.logout = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { new: true }).then((data) => {
    return res.status(OK).json({
      message: LOGOUT,
      code: OK,
    });
  });
};

exports.getCount = async (req, res, next) => {
  const data = await byIdUtils.getCount();
  return res.status(OK).json({
    data,
    code: OK,
  });
};
