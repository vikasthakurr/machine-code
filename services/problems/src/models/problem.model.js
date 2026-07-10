import { Schema, model } from "mongoose";

const problemSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    category: {
      type: String,
      enum: ["component", "feature", "mini-app", "layout", "interaction"],
      default: "component",
    },
    tags: [String],
    timeLimit: { type: Number, default: 45 },
    requirements: [String],
    starterCode: {
      html: { type: String, default: "" },
      css: { type: String, default: "" },
      js: { type: String, default: "" },
    },
    hints: [String],
    referenceImage: { type: String, default: null },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true },
);

problemSchema.index({ title: "text", description: "text" });

export const Problem = model("Problem", problemSchema);
