import { notFound, ok } from "@devpractice/shared";
import * as executionService from "../services/execution.service.js";

export async function getResult(req, res) {
  const result = await executionService.getBySubmission(
    req.params.submissionId,
  );
  if (!result) return notFound(res, "Execution result not found");
  ok(res, result);
}
