module.exports = {
  // HTTP Status Codes
  ACCEPTED: 202,
  BAD_GATEWAY: 502,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  CREATED: 201,
  FORBIDDEN: 403,
  GATEWAY_TIMEOUT: 504,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  NOT_IMPLEMENTED: 501,
  OK: 200,
  PAYMENT_REQUIRED: 402,
  PRECONDITION_FAILED: 412,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TOO_LONG: 413,
  REQUEST_URI_TOO_LONG: 414,
  SERVICE_UNAVAILABLE: 503,
  TOO_MANY_REQUESTS: 429,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,

  BUSSINESS_ENTITY: "bussinessAuth",
  ADMIN: "admin",
  VERIFY_MAIL_BUSSINESS: "BussinessMailVerify",
  VERIFY_PHONE_BUSSINESS: "BussinessPhoneVerify",
  ADMIN_ADDED_CREDENTIALS: "SEND_CREDENTIALS",
  VERIFY_MAIL: "verifyMail",
  VERIFY_PHONE: "verifyPhone",
  USER: "user",

  LOGGED_IN: ["user", "admin", "creator", "fan"],
  USER_ROLES: ["fan", "admin", "creator"],
  AUTH_ROLES: ["user", "admin", "creator", "fan"],
  REF_PATH: ["channelpartner", "bussinessEntity"],
  USER_TYPES: ["dispatcher", "accountuser", "saleperson", "others", "admin"],
  BID_PERIOD: ["24", "48", "72"],

  CHANNEL_PARTNER: ["distributor", "dealer"],
  PAYMENT_MODE: ["advance", "pdc", "credit", "none"],
  BOOLEAN: ["true", "false"],

  DEFAULT_IMAGE: "images/placeholder.jpeg",
  STATUSES: ["active", "deactive", "blocked"],
  REMARK_TYPE: ["add", "remove", "create"],
  ORDER_STATUS: [
    "inQueue",
    "pending",
    "paymentUnverified",
    "billAttached",
    "halfDispatched",
    "dispatched",
    "cancelled",
  ],
  BILL_STATUS: ["paid", "unpaid", "cancelled"],

  // Messages
  RECORD_CREATED: "Record created successfully!",
  ACCESS_DENIED_POST: "You are not allowed to post paid content!",
  SOMETHING_WENT_WONG: "Opps Something wents wrong..! please try agian!",
  WEATHER_DETAILS: "Weather details..!",
  LOGOUT: "User Logout successfully!",
  RECORD_UPDATED: "Record updated successfully!",
  RECORD_DELETED: "Record deleted successfully!",
  NO_RECORD_FOUND: "No record found for given details",
  TOKEN_EXPIRED: "Invalid Token or Your token has expired..! ",
  USER_BLOCK: "User Block Successfully..!!",
  RECORDS_FOUND: "Records found for given details",
  VALIDATION_ERROR: "Please Check your inputs! Something went Wrong.",
  INVALID_CREDENTIALS: "Invalid Credentials, Please check and try again!",
  EMAIL_EXIST: "Email is already in use by another account",
  EMAIL_NOT_FOUND: "Email is not registered.",
  USER_NOT_FOUND: "User is not registered.",
  PRODUCT_ALREADY_EXIST: "Product already exists.!!.",
  MASTER_ALREADY_EXIST: "Master with that CODE already exists.!!.",
  INVALID_FILE_TYPE: "File type not supported.",
  ENOT_ACCESS: "Unable to create directory.",
  REQUEST_OVERFLOW: "Rate limt exceeded, please try again later some time.",
  SUCCESS: 1,
  FAIL: 0,

  OTP_SEND: "OTP send succesfully..!",
  OTP_VERIFY: "OTP verify succesfully..!",
  SEND_EMAIL: "scapperapp@gmail.com",
  SEND_OTP_SUCCESS: "OTP !",
  SEND_AUTHORIZATION_HEADER: "Credentail's for your account.!",
  BOOKING_CANCEL_HEADER: "Booking cancelled!",
  BOOKING_CONFIRM_HEADER: "Booking confirmed!",
};
