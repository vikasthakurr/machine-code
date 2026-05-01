import * as submissionsService from './submissions.service.js';
import { ok, created, notFound, badRequest } from '../../utils/response.js';

export async function submit(req, res) {
  try {
    const { problemId, language, code } = req.body;
    const submission = await submissionsService.submit(req.userId, problemId, language, code);
    created(res, submission);
  } catch (err) {
    badRequest(res, err.message);
  }
}

export async function getById(req, res) {
  const submission = await submissionsService.getById(req.params.id);
  if (!submission) return notFound(res, 'Submission not found');
  ok(res, submission);
}

export async function getMySubmissions(req, res) {
  const submissions = await submissionsService.getByUser(req.userId);
  ok(res, submissions);
}
