import express from 'express';
import { apiRouter } from './routes/index.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { serverConfig } from './config/serverConfig.js';
import cors from 'cors';

export function createApp(): express.Application {
  const app = express();

  app.use(
    cors({
      origin: serverConfig.corsOrigins.length > 0 ? serverConfig.corsOrigins : true,
    })
  );

  app.use(express.json({ limit: serverConfig.bodyLimit }));
  app.use(express.urlencoded({ extended: true, limit: serverConfig.bodyLimit }));
  app.use(requestLogger);

  // Mount API router
  app.use(serverConfig.apiPrefix, apiRouter);

  // Error handling middleware
  app.use(errorHandler);

  return app;
}
