import * as joi from '@hapi/joi';

export const schema =
  joi.object().keys({
    service: {
      port: joi.number().integer().required(),
      host: joi.string().min(3).required(),
    },
    env: joi.string().valid('development', 'testing', 'staging', 'production').required(),
    applicationTTL: joi.number().integer().default(30000)
  }).unknown();
