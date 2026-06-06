import { authenticate } from "@devpractice/shared";
import { Router } from "express";
import { env } from "../config/env.js";
import { getAll, markRead } from "../controllers/notifications.controller.js";

const router = Router();

const auth = authenticate(env.JWT_SECRET);

router.use(auth);

router.get("/", getAll);
router.patch("/:id/read", markRead);

export default router;
