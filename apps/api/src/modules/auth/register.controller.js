import * as authService from './auth.service.js';
import { created, badRequest } from '../../utils/response.js';

export async function register(req, res) {
  try {
    const user = await authService.register(req.body);
    created(res, user);
  } catch (err) {
    badRequest(res, err.message);
  }
}
