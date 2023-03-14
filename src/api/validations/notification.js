const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  // GET /v1/category/list
  list: {
    query: {
      page: Joi.number().min(0),
      perPage: Joi.number().min(1).max(50),
    },
  },
};
