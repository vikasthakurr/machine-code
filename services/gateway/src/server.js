import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";
import { env } from "./config/env.js";

const app = express();

app.use(helmet());
app.use(cors());
if (env.NODE_ENV !== "test") app.use(morgan("dev"));

// Rate limiting — 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

// Stricter limiter for auth routes (20 requests per 15 min)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many auth attempts, please try again later",
  },
});

app.use(limiter);

// Health check
app.get("/health", (_req, res) =>
  res.json({ status: "ok", service: "gateway" }),
);

// Route definitions: path prefix → target service
const routes = [
  { path: "/api/v1/auth", target: env.AUTH_SERVICE_URL, limiter: authLimiter },
  { path: "/api/v1/problems", target: env.PROBLEMS_SERVICE_URL },
  { path: "/api/v1/submissions", target: env.SUBMISSIONS_SERVICE_URL },
  { path: "/api/v1/execution", target: env.EXECUTION_SERVICE_URL },
  { path: "/api/v1/notifications", target: env.NOTIFICATIONS_SERVICE_URL },
];

// Set up proxy for each route
for (const route of routes) {
  const middlewares = [];

  if (route.limiter) {
    middlewares.push(route.limiter);
  }

  middlewares.push(
    createProxyMiddleware({
      target: route.target,
      changeOrigin: true,
      on: {
        proxyReq: (proxyReq, req) => {
          // Forward the full original URL path to the downstream service
          proxyReq.path = req.originalUrl;
        },
        error: (err, _req, res) => {
          console.error(
            `[gateway] proxy error for ${route.path}:`,
            err.message,
          );
          res
            .status(502)
            .json({ success: false, message: "Service unavailable" });
        },
      },
    }),
  );

  app.use(route.path, ...middlewares);
}

// Fallback
app.use((_req, res) =>
  res.status(404).json({ success: false, message: "Route not found" }),
);

app.listen(env.PORT, () => {
  console.log(
    `[gateway] running on http://localhost:${env.PORT} (${env.NODE_ENV})`,
  );
  console.log("[gateway] routing:");
  for (const route of routes) {
    console.log(`  ${route.path} → ${route.target}`);
  }
});
