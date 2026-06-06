import { Queue } from "bullmq";
import { env } from "./env.js";

const connection = { url: env.REDIS_URL };

export const submissionQueue = new Queue("submissions", { connection });
