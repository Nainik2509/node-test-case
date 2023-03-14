const moment = require("moment");
const Utilities = require("./util");
class FindByIdModelUtilities {
  constructor() {
    this.utils = new Utilities();
    this._userModel = require("../api/models/user");
  }

  async getCount() {
    try {
      const data = {};

      data.userCount = await this._userModel.countDocuments();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async userById(ID, populate) {
    try {
      var userFound = await this._userModel.findById(ID).populate(populate);
      if (userFound) {
        return userFound.transform();
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = FindByIdModelUtilities;
