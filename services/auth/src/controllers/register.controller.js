import { badRequest, created } from "@devpractice/shared";
import * as authService from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const user = await authService.register(req.validated);
    created(res, user);
  } catch (err) {
    badRequest(res, err.message);
  }
}
