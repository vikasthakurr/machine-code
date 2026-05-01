import * as executionService from './execution.service.js';
import { ok, notFound } from '../../utils/response.js';

export async function getResult(req, res) {
  const result = await executionService.getBySubmission(req.params.submissionId);
  if (!result) return notFound(res, 'Execution result not found');
  ok(res, result);
}
