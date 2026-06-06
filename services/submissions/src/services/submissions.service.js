import { submissionQueue } from "../config/redis.js";
import { Submission } from "../models/submission.model.js";

/**
 * Submit code (DSA / machine-coding) — auto-evaluated via queue
 */
export async function submitCode(userId, { problemId, language, code }) {
  const submission = await Submission.create({
    userId,
    problemId,
    type: "code",
    language,
    code,
    status: "pending",
  });
  await submissionQueue.add("evaluate", {
    submissionId: submission._id.toString(),
  });
  return submission;
}

/**
 * Submit design (HLD / LLD) — stored for review
 */
export async function submitDesign(
  userId,
  { problemId, diagram, notes, apiDesign },
) {
  const submission = await Submission.create({
    userId,
    problemId,
    type: "design",
    diagram,
    notes,
    apiDesign,
    status: "submitted",
  });
  return submission;
}

/**
 * Review a design submission
 */
export async function reviewSubmission(
  reviewerId,
  submissionId,
  { scores, overallFeedback },
) {
  const submission = await Submission.findById(submissionId);
  if (!submission) throw new Error("Submission not found");
  if (submission.type !== "design")
    throw new Error("Only design submissions can be reviewed");
  if (submission.status === "reviewed")
    throw new Error("Submission already reviewed");

  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const maxScore = scores.reduce((sum, s) => sum + s.maxScore, 0);

  submission.review = {
    reviewerId,
    scores,
    totalScore,
    maxScore,
    overallFeedback: overallFeedback || "",
    reviewedAt: new Date(),
  };
  submission.status = "reviewed";
  submission.result = {
    totalScore,
    maxScore,
    percentage: Math.round((totalScore / maxScore) * 100),
  };

  await submission.save();
  return submission;
}

/**
 * Get submissions pending review (for reviewers/admins)
 */
export async function getPendingReviews({ page = 1, limit = 20 } = {}) {
  const filter = { type: "design", status: "submitted" };
  const skip = (Math.max(1, Number(page)) - 1) * Number(limit);

  const [submissions, total] = await Promise.all([
    Submission.find(filter)
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(Number(limit)),
    Submission.countDocuments(filter),
  ]);

  return {
    submissions,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
      hasNext: skip + submissions.length < total,
      hasPrev: Number(page) > 1,
    },
  };
}

export const getById = (id) => Submission.findById(id);

export async function getByUser(
  userId,
  { page = 1, limit = 20, status, language, problemId, type } = {},
) {
  const filter = { userId };

  if (status) filter.status = status;
  if (language) filter.language = language;
  if (problemId) filter.problemId = problemId;
  if (type) filter.type = type;

  const skip = (Math.max(1, Number(page)) - 1) * Number(limit);

  const [submissions, total] = await Promise.all([
    Submission.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Submission.countDocuments(filter),
  ]);

  return {
    submissions,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
      hasNext: skip + submissions.length < total,
      hasPrev: Number(page) > 1,
    },
  };
}
