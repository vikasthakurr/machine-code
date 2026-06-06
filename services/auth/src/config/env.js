import "dotenv/config";

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3001", 10),
  MONGO_URI:
    process.env.MONGO_URI || "mongodb://localhost:27017/devpractice_auth",
  JWT_SECRET: process.env.JWT_SECRET || "change-me",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};
