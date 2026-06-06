import "dotenv/config";

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3003", 10),
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb://localhost:27017/devpractice_submissions",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  JWT_SECRET: process.env.JWT_SECRET || "change-me",
};
