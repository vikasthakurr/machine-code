import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { unauthorized } from '../utils/response.js';

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return unauthorized(res);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch {
    unauthorized(res, 'Invalid token');
  }
}
