import "dotenv/config";

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/devpractice",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  EVALUATION_SERVICE_URL:
    process.env.EVALUATION_SERVICE_URL || "http://localhost:8000",
};
