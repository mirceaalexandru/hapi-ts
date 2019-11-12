// @ts-ignore
import packageDescription from './../package.json';

export const config = () => {
  return {
    projectName: process.env.PROJECT_NAME,
    version: packageDescription.version,
    service: {
      port: process.env.SERVICE_PORT,
      host: process.env.SERVICE_HOST
    },
    env: process.env.NODE_ENV,
    application_ttl: process.env.APPLICATION_TTL
  }
}

