import { Worker } from "bullmq";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import { processSubmission } from "./processor.js";

async function bootstrap() {
  await mongoose.connect(env.MONGO_URI);
  console.log("[worker] connected to mongodb");

  const worker = new Worker("submissions", processSubmission, {
    connection: { url: env.REDIS_URL },
    concurrency: 5,
  });

  worker.on("completed", (job) => {
    console.log(`[worker] job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`[worker] job ${job.id} failed:`, err.message);
  });

  console.log(`[worker] listening for jobs on queue "submissions"`);
}

bootstrap().catch((err) => {
  console.error("[worker] failed to start", err);
  process.exit(1);
});
