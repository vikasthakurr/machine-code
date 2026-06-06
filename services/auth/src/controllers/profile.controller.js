import { badRequest, ok } from "@devpractice/shared";
import * as authService from "../services/auth.service.js";

export async function updateProfile(req, res) {
  try {
    const user = await authService.updateProfile(req.userId, req.validated);
    ok(res, user);
  } catch (err) {
    badRequest(res, err.message);
  }
}
