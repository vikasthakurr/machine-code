import * as authService from './auth.service.js';
import { created, ok, badRequest } from '../../utils/response.js';

export async function register(req, res) {
  try {
    const { email, username, password } = req.body;
    const user = await authService.register(email, username, password);
    created(res, user);
  } catch (err) {
    badRequest(res, err.message);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    ok(res, result);
  } catch (err) {
    badRequest(res, err.message);
  }
}
