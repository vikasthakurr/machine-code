import { badRequest, ok, notFound } from "@devpractice/shared";
import * as authService from "../services/auth.service.js";
import { User } from "../models/user.model.js";
export async function updateProfile(req, res) {
  try {
    const user = await authService.updateProfile(req.userId, req.validated);
    ok(res, user);
  } catch (err) {
    badRequest(res, err.message);
  }
}

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return notFound(res, "User not found");
    }

    ok(res, user);
  } catch (err) {
    badRequest(res, err.message);
  }
}
