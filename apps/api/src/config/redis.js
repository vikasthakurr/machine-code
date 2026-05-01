import { Queue, Worker } from 'bullmq';
import { env } from './env.js';

const connection = { url: env.REDIS_URL };

export const submissionQueue = new Queue('submissions', { connection });

export function createWorker(processorFile) {
  return new Worker('submissions', processorFile, { connection });
}
