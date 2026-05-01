import * as authService from './auth.service.js';
import { ok, badRequest } from '../../utils/response.js';
import { env } from '../../config/env.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    ok(res, result);
  } catch (err) {
    badRequest(res, err.message);
  }
}

// called after passport successfully authenticates with Google
export function googleCallback(req, res) {
  const token = authService.generateToken(req.user._id);

  // TODO: switch to redirect once frontend is ready
  // res.redirect(`${env.CLIENT_URL}/auth/callback?token=${token}`);

  // for now return JSON so you can verify it works
  res.json({ success: true, data: { token, user: req.user } });
}
