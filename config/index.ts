import { config as environment } from './environment';
import { schema } from './schema';
import {
  ValidationResult
} from "@hapi/joi";
import {
  ConfigInterface
} from './interfaces/ConfigInterface';

const internals = {
  config: null as any
};

export async function get (): Promise<ConfigInterface> {
  if (internals.config) {
    return internals.config;
  }
  // try to load using dotenv
  // in production dotenv will not be installed so this will not be used.
  try {
    // tslint:disable-next-line
    require('dotenv').config({ path: '.env' });
  } catch (err) {
    // ignore this error for production
  }

  const result: ValidationResult = await schema.validate(environment());
  internals.config = <ConfigInterface><unknown>result;
  // tslint:disable-next-line
  console.log(internals.config, 'Load using configuration'); // eslint-disable-line
  return internals.config;
}
