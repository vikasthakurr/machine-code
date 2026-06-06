import { authenticate } from "@devpractice/shared";
import { validate } from "@devpractice/shared/validate";
import { Router } from "express";
import { env } from "../config/env.js";
import {
  create,
  getAll,
  getBySlug,
} from "../controllers/problems.controller.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import { createProblemSchema } from "../validations/problems.schema.js";

const router = Router();

const auth = authenticate(env.JWT_SECRET);

router.get("/", getAll);
router.get("/:slug", getBySlug);
router.post("/", auth, adminOnly, validate(createProblemSchema), create);

export default router;
