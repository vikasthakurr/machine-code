import "dotenv/config";

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3000", 10),

  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://localhost:3001",
  PROBLEMS_SERVICE_URL:
    process.env.PROBLEMS_SERVICE_URL || "http://localhost:3002",
  SUBMISSIONS_SERVICE_URL:
    process.env.SUBMISSIONS_SERVICE_URL || "http://localhost:3003",
  EXECUTION_SERVICE_URL:
    process.env.EXECUTION_SERVICE_URL || "http://localhost:3004",
  NOTIFICATIONS_SERVICE_URL:
    process.env.NOTIFICATIONS_SERVICE_URL || "http://localhost:3005",
};
