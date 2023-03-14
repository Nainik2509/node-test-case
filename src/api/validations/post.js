const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { STATUSES, TYPEOFBANNER } = require("../../utils/constants");

module.exports = {
  // POST /v1/post/add
  add: {
    body: {
      body: Joi.string().required().min(2),
      isPaid: Joi.boolean(),
      // amount: Joi.number().when('isPaid', { is: true, then: Joi.number().integer().required() }),
      status: Joi.string().valid(STATUSES)
    }
  },

  postOperation: {
    body: {
      postId: Joi.objectId().required(),
    }
  },

  // GET /v1/post/list
  list: {
    query: {
      page: Joi.number().min(0),
      perPage: Joi.number()
        .min(1)
        .max(50)
    }
  },

  // GET /v1/post/:id
  get: {
    params: {
      id: Joi.objectId().required()
    }
  },

  // POST /v1/post/:id
  update: {
    params: {
      id: Joi.objectId().required()
    },
    body: {
      body: Joi.string().min(2),
      isPaid: Joi.boolean(),
      // amount: Joi.string().when('isPaid', { is: true, then: Joi.number().integer() }),
      status: Joi.string().valid(STATUSES)
    }
  }
};
