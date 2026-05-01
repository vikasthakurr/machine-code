import { Submission } from './submissions.model.js';
import { submissionQueue } from '../../config/redis.js';

export async function submit(userId, problemId, language, code) {
  const submission = await Submission.create({ userId, problemId, language, code });
  await submissionQueue.add('evaluate', { submissionId: submission._id.toString() });
  return submission;
}

export const getById    = (id)     => Submission.findById(id);
export const getByUser  = (userId) => Submission.find({ userId }).sort({ createdAt: -1 });
