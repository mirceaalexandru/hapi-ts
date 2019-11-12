import * as Joi from '@hapi/joi';
import {Server} from "@hapi/hapi";

import { handler } from './../handlers/health';

exports.plugin = {
  register: (server: Server)=> {
    server.route({
      path: '/v1/health',
      method: 'GET',
      options: {
        description: 'Simple health endpoint that can e used to verify the service is up and running',
        plugins: {
          'hapi-swagger': {
            responses: {
              200: {
                description: 'Service is working properly'
              }
            }
          }
        },
        tags: ['api', 'health'],
      },
      handler
    })
  },
  name: 'health',
  version: '1.0.0'
}
