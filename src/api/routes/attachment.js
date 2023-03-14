const app = require("express").Router();
const AppController = require("../controller/base");
const model = require("../models/user");
const { Authorize } = require("../../middleware/auth");
const { LOGGED_IN } = require("../../utils/constants");
const upload = require("../../../src/utils/upload");
const cloudinaryUpload = require("../../../src/utils/cloudinaryMulter");

const controller = new AppController(model);

app
  .route("/upload")
  .post(
    cloudinaryUpload.single("file"),
    controller.upload
  );

app
  .route("/imageKit/upload")
  .post(
    cloudinaryUpload.single("file"),
    controller.uploadImageKitIo
  );

app
  .route("/bunny/upload")
  .post(
    cloudinaryUpload.single("file"),
    controller.uploadBunny
  );

  
app
  .route("/bunny/stream/uploadVideo")
  .post(
    cloudinaryUpload.single("file"),
    controller.uploadVideoBunny
  );

app
  .route("/uploadServer")
  .post(
    upload.single("file"),
    controller.uploadServer
  );

module.exports = app;
