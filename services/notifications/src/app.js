import { errorHandler } from "@devpractice/shared";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import notificationsRoutes from "./routes/notifications.routes.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  if (env.NODE_ENV !== "test") app.use(morgan("dev"));

  app.get("/health", (_req, res) =>
    res.json({ status: "ok", service: "notifications" }),
  );

  app.use("/api/v1/notifications", notificationsRoutes);

  app.use((_req, res) =>
    res.status(404).json({ success: false, message: "Route not found" }),
  );
  app.use(errorHandler);

  return app;
}
