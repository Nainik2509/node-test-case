const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { STATUSES, TYPEOFBANNER } = require("../../utils/constants");

module.exports = {
  // POST /v1/banner/add
  add: {
    // body: {
    //   title: Joi.string().required(),
    //   order: Joi.number().required(),
    //   type: Joi.string().valid(TYPEOFBANNER),
    //   photos: Joi.array(),
    //   videoLink: Joi.string(),
    //   schedule: Joi.object()
    //     .required()
    //     .keys({
    //       from: Joi.date()
    //         .iso()
    //         .required(),
    //       to: Joi.date()
    //         .iso()
    //         .required()
    //     }),
    //   status: Joi.string().valid(STATUSES)
    // }
  },

  // GET /v1/banner/list
  list: {
    query: {
      page: Joi.number().min(0),
      perPage: Joi.number()
        .min(1)
        .max(50)
    }
  },

  // GET /v1/banner/:id
  get: {
    params: {
      id: Joi.objectId().required()
    }
  },

  // POST /v1/banner/:id
  update: {
    params: {
      id: Joi.objectId().required()
    },
    // body: {
    //   title: Joi.string(),
    //   order: Joi.number(),
    //   type: Joi.string().valid(TYPEOFBANNER),
    //   photos: Joi.array(),
    //   videoLink: Joi.string(),
    //   schedule: Joi.object().keys({
    //     from: Joi.date().iso(),
    //     to: Joi.date().iso()
    //   }),
    //   status: Joi.string().valid(STATUSES)
    // }
  }
};
