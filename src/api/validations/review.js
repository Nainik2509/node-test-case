const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { STATUSES, REVIEW } = require("../../utils/constants");

module.exports = {
  // POST /v1/review/add
  add: {
    body: {
      comment: Joi.string().required(),
      postId: Joi.objectId().required(),
    },
  },

  // GET /v1/review/list
  list: {
    query: {
      page: Joi.number().min(0),
      perPage: Joi.number().min(1).max(50),
    },
  },

  // GET /v1/review/:id
  get: {
    params: {
      id: Joi.objectId().required(),
    },
  },

  likeReview: {
    params: {
      id: Joi.objectId().required(),
    },
  },
  // POST /v1/review/:id
  update: {
    params: {
      id: Joi.objectId().required(),
    },
    body: {},
  },
};
