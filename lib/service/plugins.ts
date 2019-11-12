import * as HapiPino from 'hapi-pino';
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
import * as HapiSwagger from 'hapi-swagger';
import {ConfigInterface} from "../../config/interfaces/ConfigInterface";

export function configure(config: ConfigInterface): any[] {
  let plugins = [
    {
      plugin: HapiPino,
      options: {
        prettyPrint: config.env !== 'production',
        logRouteTags: true,
        level: 'debug',
        redact: {
          paths: ['req.headers', 'tags'],
          remove: true
        }
      }
    }
  ];

  if (config.env === 'development') {
    // Swagger documentation is available only in development environment.
    plugins = [
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: {
          info: {
            title: `Challenge Service API Documentation`
          },
          grouping: 'tags'
        }
      },
      ...plugins
    ]
  }
  return plugins;
}

