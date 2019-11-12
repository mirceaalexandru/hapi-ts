import { get as getConfig } from './config';
import * as service from './lib/service';

async function init() {
  await service.start(await getConfig());
}

init();