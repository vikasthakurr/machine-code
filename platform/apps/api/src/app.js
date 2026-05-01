import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/error.middleware.js';

import authRoutes          from './modules/auth/auth.routes.js';
import problemsRoutes      from './modules/problems/problems.routes.js';
import submissionsRoutes   from './modules/submissions/submissions.routes.js';
import executionRoutes     from './modules/execution/execution.routes.js';
import notificationsRoutes from './modules/notifications/notifications.routes.js';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  if (env.NODE_ENV !== 'test') app.use(morgan('dev'));

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  app.use('/api/v1/auth',          authRoutes);
  app.use('/api/v1/problems',      problemsRoutes);
  app.use('/api/v1/submissions',   submissionsRoutes);
  app.use('/api/v1/execution',     executionRoutes);
  app.use('/api/v1/notifications', notificationsRoutes);

  app.use((_req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
  app.use(errorHandler);

  return app;
}
