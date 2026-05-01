import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

async function bootstrap() {
  await connectDB();

  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`[server] running on http://localhost:${env.PORT} (${env.NODE_ENV})`);
  });
}

bootstrap().catch((err) => {
  console.error('[server] failed to start', err);
  process.exit(1);
});
