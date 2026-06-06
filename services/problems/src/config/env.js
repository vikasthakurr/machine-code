import "dotenv/config";

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3002", 10),
  MONGO_URI:
    process.env.MONGO_URI || "mongodb://localhost:27017/devpractice_problems",
  JWT_SECRET: process.env.JWT_SECRET || "change-me",
};
