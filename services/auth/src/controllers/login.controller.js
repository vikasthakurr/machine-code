import { badRequest, ok } from "@devpractice/shared";
import * as authService from "../services/auth.service.js";

export async function login(req, res) {
  try {
    const { email, password } = req.validated;
    const result = await authService.login(email, password);
    ok(res, result);
  } catch (err) {
    badRequest(res, err.message);
  }
}

export function googleCallback(req, res) {
  const token = authService.generateToken(req.user._id, req.user.role);
  // redirect once frontend is ready:
  // res.redirect(`${env.CLIENT_URL}/auth/callback?token=${token}`);
  res.json({ success: true, data: { token, user: req.user } });
}
