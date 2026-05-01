import { logger } from '../utils/logger.js';

export function errorHandler(err, _req, res, _next) {
  logger.error(err.message);
  res.status(500).json({ success: false, message: err.message || 'Internal server error' });
}
