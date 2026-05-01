import * as authService from './auth.service.js';
import { ok, badRequest } from '../../utils/response.js';

export async function updateProfile(req, res) {
  try {
    const user = await authService.updateProfile(req.userId, req.body);
    ok(res, user);
  } catch (err) {
    badRequest(res, err.message);
  }
}
