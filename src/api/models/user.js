const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const moment = require("moment");

const {
  USER_ROLES,
  INVALID_CREDENTIALS,
  BAD_REQUEST,
  EMAIL_NOT_FOUND,
  STATUSES,
  NOT_FOUND,
} = require("../../utils/constants");
const {
  saltRound,
  jwtExpirationInterval,
  jwtSecret,
} = require("../../config/env-vars");
const APIError = require("../../utils/APIError");
const Utilities = require("../../utils/util");
const Jwt = require("jsonwebtoken");

const UserModel = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter your first name!"],
      trim: true,
      minlength: 2,
      maxlength: 126,
    },
    last_name: {
      type: String,
      required: [true, "Please enter your last name!"],
      trim: true,
      minlength: 2,
      maxlength: 126,
    },
    emailInfo: {
      emailId: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        sparse: true,
        lowercase: true,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: {
        values: USER_ROLES,
        message: "User status is either: Fan, Creator or admin",
      },
      lowercase: true,
      default: "fan",
    },
    otp: {
      type: [
        {
          code: {
            type: Number,
            trim: true,
          },
          sentTo: {
            type: String,
            trim: true,
          },
          expireAt: {
            type: Date,
            default: () => Date.now() + 300000,
          },
        },
      ],
      select: false,
    },
    status: {
      type: String,
      enum: {
        values: STATUSES,
        message: "User status is either: active, deactive, or blocked",
      },
      lowercase: true,
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const utils = new Utilities();

UserModel.statics = {
  async ValidateUserAndGenerateToken(options, populate) {
    const { username, password } = options;
    var condition = {};
    if (utils.validateEmail(username)) {
      condition = { "emailInfo.emailId": username };
    } else {
      condition = { $or: [{ username }, { "phoneNo.mobile": username }] };
    }
    const user = await this.findOne(condition).populate(populate).exec();
    if (!user) {
      throw new APIError({
        message: EMAIL_NOT_FOUND,
        status: NOT_FOUND,
      });
    }
    if (!(await user.matchPassword(password))) {
      throw new APIError({
        message: INVALID_CREDENTIALS,
        status: BAD_REQUEST,
      });
    }
    return user.transform();
  },
  elevated() {
    return ["password", "__v", "otp"];
  },
  searchables() {
    return [
      "first_name",
      "last_name",
      "username",
      "emailInfo.emailId",
      "phoneNo.mobile",
      "status",
      "role",
    ];
  },
};

UserModel.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();
    const hash = await bcrypt.hash(this.password, Number(saltRound));
    this.password = hash;

    this.first_name
      ? (this.first_name = await utils.capital_letter(this.first_name))
      : this.first_name;
    this.last_name
      ? (this.last_name = await utils.capital_letter(this.last_name))
      : this.last_name;
    this.email = this.emailInfo.emailId;

    return next();
  } catch (err) {
    return next(err);
  }
});

UserModel.virtual("fullName").get(function () {
  return this.first_name + " " + this.last_name;
});

UserModel.method({
  transform() {
    var res = utils.omitter(UserModel.statics.elevated(), this._doc);
    res.token = this.token();
    res.fb_token = null;
    res.google_token = null;
    res.fullName = this.first_name + " " + this.last_name;
    res.followersCount = res.followers ? res.followers.length : 0;
    res.followingCount = res.following ? res.following.length : 0;
    return res;
  },
  token() {
    const payload = {
      exp: moment().add(jwtExpirationInterval, "minutes").unix(),
      iat: moment().unix(),
      sub: this._id,
      status: this.status,
    };
    return Jwt.sign(payload, jwtSecret);
  },
  async matchPassword(password) {
    return bcrypt.compare(password, this.password);
  },
});

module.exports = model("user", UserModel);
