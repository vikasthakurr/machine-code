import { Execution } from "../models/execution.model.js";

export const getBySubmission = (submissionId) =>
  Execution.findOne({ submissionId });
