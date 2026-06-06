import { authenticate } from "@devpractice/shared";
import { Router } from "express";
import { env } from "../config/env.js";
import { getResult } from "../controllers/execution.controller.js";

const router = Router();

const auth = authenticate(env.JWT_SECRET);

router.get("/:submissionId", auth, getResult);

export default router;
