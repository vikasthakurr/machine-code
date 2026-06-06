import { authenticate } from "@devpractice/shared";
import { validate } from "@devpractice/shared/validate";
import { Router } from "express";
import { env } from "../config/env.js";
import {
  getById,
  getMySubmissions,
  getPendingReviews,
  review,
  submit,
} from "../controllers/submissions.controller.js";
import {
  reviewSchema,
  submitSchema,
} from "../validations/submissions.schema.js";

const router = Router();

const auth = authenticate(env.JWT_SECRET);

router.use(auth);

// Submit (code or design)
router.post("/", validate(submitSchema), submit);

// My submissions
router.get("/me", getMySubmissions);

// Pending reviews (admin/reviewer)
router.get("/reviews/pending", getPendingReviews);

// Get specific submission
router.get("/:id", getById);

// Review a design submission
router.post("/:id/review", validate(reviewSchema), review);

export default router;
