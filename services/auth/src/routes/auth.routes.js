import { authenticate } from "@devpractice/shared";
import { validate } from "@devpractice/shared/validate";
import { Router } from "express";
import passport from "passport";
import { env } from "../config/env.js";
import { googleCallback, login } from "../controllers/login.controller.js";
import { updateProfile } from "../controllers/profile.controller.js";
import { register } from "../controllers/register.controller.js";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "../validations/auth.schema.js";

const router = Router();

const auth = authenticate(env.JWT_SECRET);

// local auth
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.patch("/profile", auth, validate(updateProfileSchema), updateProfile);

// google oauth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/v1/auth/google/failure",
  }),
  googleCallback,
);
router.get("/google/failure", (_req, res) => {
  res
    .status(401)
    .json({ success: false, message: "Google authentication failed" });
});

export default router;
