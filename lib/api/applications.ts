import * as Joi from '@hapi/joi';
import {Server} from "@hapi/hapi";

const {
  post,
  remove,
  getAll
} = require('./../handlers/applications')

exports.plugin = {
  register: (server: Server) => {
    server.route({
      path: '/{group}/{id}',
      method: 'POST',
      options: {
        description: 'Register an application in specified group',
        validate: {
          payload: Joi.object().keys({
            meta: Joi.object().optional()
          }),
          params: Joi.object().keys({
            group: Joi.string().min(1).max(256).required(),
            id: Joi.string().min(1).max(256).required(),
          }).required()
        },
        response: {
          failAction: 'log',
          status: {
            200: Joi.object().keys({
              id: Joi.string().required(),
              group: Joi.string().required(),
              createdAt: Joi.date().required(),
              updatedAt: Joi.date().required(),
              meta: Joi.object().optional()
            })
          }
        },
        tags: ['api', 'groups'],
      },
      handler: post
    })

    server.route({
      path: '/{group}/{id}',
      method: 'DELETE',
      options: {
        description: 'Unregister an application in specified group',
        validate: {
          params: Joi.object().keys({
            group: Joi.string().min(1).max(256).required(),
            id: Joi.string().min(1).max(256).required(),
          }).required()
        },
        response: {
          failAction: 'log',
          status: {
            204: Joi.object()
          }
        },
        tags: ['api', 'groups'],
      },
      handler: remove
    })

    server.route({
      path: '/{group}',
      method: 'GET',
      options: {
        description: 'Get list of all applications registered in specified group',
        validate: {
          params: Joi.object().keys({
            group: Joi.string().min(1).max(256).required()
          }).required()
        },
        response: {
          failAction: 'log',
          status: {
            200: Joi.array().items(
              Joi.object().keys({
                id: Joi.string().required(),
                group: Joi.string().required(),
                createdAt: Joi.date().required(),
                updatedAt: Joi.date().required(),
                meta: Joi.object().optional()
              })
            ).required()
          }
        },
        tags: ['api', 'groups'],
      },
      handler: getAll
    })
  },
  name: 'group',
  version: '1.0.0'
}
