import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, default: null },
    username: { type: String, required: true, unique: true, trim: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String, default: null },

    profilePic: { type: String, default: null },
    bio: { type: String, maxlength: 300, default: null },

    collegeName: { type: String, trim: true, default: null },
    passingYear: { type: Number, min: 2000, max: 2100, default: null },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
      default: null,
    },
    userType: {
      type: String,
      enum: ["student", "working_professional", "other"],
      default: null,
    },

    linkedIn: { type: String, default: null },
    github: { type: String, default: null },
    website: { type: String, default: null },

    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
