const Joi = require("joi");
const { STATUSES } = require("../../utils/constants");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  // POST /v1/category/add
  add: {
    body: {
      name: Joi.string().min(3).max(128).required(),
      status: Joi.string().valid(STATUSES)
    }
  },

  // GET /v1/category/list
  list: {
    query: {
      page: Joi.number().min(0),
      perPage: Joi.number()
        .min(1)
        .max(50),
      status: Joi.string().valid(STATUSES)
    }
  },

  // GET /v1/category/:id
  get: {
    params: {
      id: Joi.objectId().required()
    }
  },

  // POST /v1/category/:id
  update: {
    body: {
      name: Joi.string().min(3).max(128),
      status: Joi.string().valid(STATUSES)
    },
    params: {
      id: Joi.objectId().required()
    }
  }
};
