export const config = () => {
  return {
    service: {
      port: process.env.SERVICE_PORT,
      host: process.env.SERVICE_HOST
    },
    env: process.env.NODE_ENV,
    applicationTTL: process.env.APPLICATION_TTL
  }
};

