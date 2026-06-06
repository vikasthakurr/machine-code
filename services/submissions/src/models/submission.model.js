import { Schema, model } from "mongoose";

const submissionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    problemId: { type: Schema.Types.ObjectId, required: true },
    type: {
      type: String,
      enum: ["code", "design"],
      default: "code",
    },

    // ─── For code submissions (DSA / machine-coding) ─────────
    language: { type: String, default: null },
    code: { type: String, default: null },

    // ─── For design submissions (HLD / LLD) ──────────────────
    diagram: { type: Schema.Types.Mixed, default: null }, // Excalidraw JSON
    notes: { type: String, default: null }, // Markdown explanation
    apiDesign: { type: String, default: null }, // API contracts / pseudocode

    // ─── Common ──────────────────────────────────────────────
    status: {
      type: String,
      enum: [
        "pending",
        "running",
        "accepted",
        "rejected",
        "error",
        "submitted",
        "reviewed",
      ],
      default: "pending",
    },
    result: { type: Schema.Types.Mixed },

    // ─── Review (for design submissions) ─────────────────────
    review: {
      reviewerId: { type: Schema.Types.ObjectId, default: null },
      scores: [
        {
          criterion: String,
          score: Number,
          maxScore: Number,
          feedback: String,
        },
      ],
      totalScore: { type: Number, default: null },
      maxScore: { type: Number, default: null },
      overallFeedback: { type: String, default: null },
      reviewedAt: { type: Date, default: null },
    },
  },
  { timestamps: true },
);

export const Submission = model("Submission", submissionSchema);
