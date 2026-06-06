import { badRequest, created, notFound, ok } from "@devpractice/shared";
import * as submissionsService from "../services/submissions.service.js";

export async function submit(req, res) {
  try {
    const data = req.validated;

    let submission;
    if (data.type === "code") {
      submission = await submissionsService.submitCode(req.userId, data);
    } else {
      submission = await submissionsService.submitDesign(req.userId, data);
    }

    created(res, submission);
  } catch (err) {
    badRequest(res, err.message);
  }
}

export async function getById(req, res) {
  const submission = await submissionsService.getById(req.params.id);
  if (!submission) return notFound(res, "Submission not found");
  ok(res, submission);
}

export async function getMySubmissions(req, res) {
  const { page, limit, status, language, problemId, type } = req.query;
  const result = await submissionsService.getByUser(req.userId, {
    page,
    limit,
    status,
    language,
    problemId,
    type,
  });
  ok(res, result);
}

export async function review(req, res) {
  try {
    const submission = await submissionsService.reviewSubmission(
      req.userId,
      req.params.id,
      req.validated,
    );
    ok(res, submission);
  } catch (err) {
    badRequest(res, err.message);
  }
}

export async function getPendingReviews(req, res) {
  const { page, limit } = req.query;
  const result = await submissionsService.getPendingReviews({ page, limit });
  ok(res, result);
}
