const app = require("express").Router();
const Validate = require("express-validation");
const UserController = require("../controller/user");
const model = require("../models/user");
const { Authorize } = require("../../middleware/auth");
const {
  update,
  manageUser,
  stripe,
  stripeRetrive,
} = require("../validations/user");
const { LOGGED_IN } = require("../../utils/constants");

const controller = new UserController(model);

app.route("/map/list").post(Authorize(LOGGED_IN), controller.mapList);

app.route("/me").post(Authorize(LOGGED_IN), controller.myData);

app
  .route("/:id")
  .post(Authorize(LOGGED_IN), Validate(update), controller.update);
// .delete(Authorize(ADMIN), Validate(get), controller.delete);

module.exports = app;
