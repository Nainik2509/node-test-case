const { USER_ROLES, STATUSES, USER_TYPES } = require("../../utils/constants");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  // POST /v1/auth/register
  Register: {
    body: {
      first_name: Joi.string().required().min(2).max(126),
      last_name: Joi.string().required().min(2).max(126),
      username: Joi.string().required().min(2).max(126),
      emailInfo: Joi.object().required().keys({
        emailId: Joi.string().email().required(),
      }),
      phoneNo: Joi.object()
        .required()
        .keys({
          ccode: Joi.string().required(),
          mobile: Joi.string().required().min(6).max(14),
        }),
      password: Joi.string().required().min(6).max(128),
      status: Joi.string().valid(STATUSES),
      role: Joi.string().valid(USER_ROLES),
    },
  },

  // POST /v1/auth/login
  Login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required().min(6).max(128),
    },
  },

  // POST /v1/auth/otp-verify
  OTP: {
    body: {
      code: Joi.number().min(3).required(),
      sentTo: Joi.string().required(),
    },
  },

  // POST /v1/auth/forgot-password
  // POST /v1/auth/resend-otp
  ForgetPassword: {
    body: {
      username: Joi.string().required(),
    },
  },

  // POST /v1/auth/set-password
  SetPassword: {
    body: {
      newPassword: Joi.string().required().min(6).max(128),
    },
  },

  // POST /v1/auth/change-password
  ChangePassword: {
    body: {
      currentPassword: Joi.string().required().min(6).max(128),
      newPassword: Joi.string().required().min(6).max(128),
    },
  },
};
