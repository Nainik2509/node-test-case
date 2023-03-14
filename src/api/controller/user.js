const AppController = require("./base");
const FindByIdModelUtilities = require("../../utils/FindByIdModelUtils");

class UserController extends AppController {
  constructor(model) {
    super(model);
    this._model = model;
    this.reservedVars = [
      "populate",
      "fields",
      "page",
      "perPage",
      "counter",
      "asc",
      "dsc",
      "query",
    ];
    this.byIdUtils = new FindByIdModelUtilities();
  }

  async myData(req, res, next) {
    try {
      // await UserModel.findByIdAndUpdate(req.body.unfollowId, {
      //   $pull: { followers: req.user._id }
      // }, { new: true }, async (err, result) => {
      //   await UserModel.findByIdAndUpdate(req.user._id, {
      //     $pull: { following: req.body.unfollowId }
      //   }, { new: true }).then(async (updated) => {
      //     var user = await UserModel.findById({ _id: updated._id }).populate(req.body.populate).exec();
      //     user = user.transform();
      //     return res
      //       .status(CREATED)
      //       .json({ data: user, code: OK, message: RECORD_UPDATED });
      //   })
      // })
    } catch (error) {
      return next(error);
    }
  }
}
module.exports = UserController;
