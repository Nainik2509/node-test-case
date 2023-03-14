const Utilities = require("./util");
const FindByIdModelUtilities = require("./FindByIdModelUtils");

class CreateModelUtilities {
  constructor() {
    this.utils = new Utilities();
    this.byIdUtils = new FindByIdModelUtilities();
  }
}
module.exports = CreateModelUtilities;
