import { Execution } from './execution.model.js';

export const getBySubmission = (submissionId) => Execution.findOne({ submissionId });
