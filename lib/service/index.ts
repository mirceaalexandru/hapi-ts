import * as boom from '@hapi/boom';
import { Server } from '@hapi/hapi';
import { configure as getPlugins } from './plugins';
import { endpoints as api } from "../api";
import {ConfigInterface} from "../../config/interfaces/ConfigInterface";
import Storage from './../storage';

export async function start (config: ConfigInterface) {
  const server = await register (config);
  await server.start();

  server.logger().info(`Server running at: ${server.info.uri}`);
  return server;
}

export async function register (config: ConfigInterface) {
  const { service: {host, port} } = config;

  const server: Server = new Server({
    port,
    host,
    routes: {
      validate: {
        failAction: async (request, h, err) => {
          // log endpoint validation error details.
          server.logger().error('ValidationError:', err ? err.message : 'N/A');
          throw boom.badRequest('Invalid request');
        }
      }
    }
  });

  server.app = {
    config: config
  };

  await server.register([
    ...getPlugins(config),
    ...api
  ]);

  const storage = <any>(new Storage(server.logger(), config.applicationTTL));
  server.decorate('server', 'storage', storage);

  server.events.on('stop', () => {
    (<any>server).storage.close();
    // tslint:disable-next-line
    console.log('Server stopped');
  });

  return server;
}
