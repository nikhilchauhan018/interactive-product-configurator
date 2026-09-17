import { ENV } from './environment.js';

export const serverConfig = {
  port: ENV.PORT,
  corsOrigins: ENV.CORS_ORIGINS,
  bodyLimit: '25mb', // Supports base64 graphic uploads and snapshots
  apiPrefix: '/api',
};
