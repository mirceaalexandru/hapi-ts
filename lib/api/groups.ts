import * as Joi from '@hapi/joi';
import {Server} from '@hapi/hapi';

import {
  getSummary
} from './../handlers/groups';

exports.plugin = {
  register: (server: Server) => {
    server.route({
      path: '/',
      method: 'GET',
      options: {
        description: 'Return summary for all registered groups',
        response: {
          failAction: 'log',
          status: {
            200: Joi.array().items(
              Joi.object().keys({
                group: Joi.string().required(),
                instances: Joi.number().integer().required(),
                createdAt: Joi.date().required(),
                updatedAt: Joi.date().required(),
              })
            ).required()
          }
        },
        tags: ['api', 'summary', 'groups'],
      },
      handler: getSummary
    })
  },
  name: 'summary',
  version: '1.0.0'
}
