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
    type: {
      type: String,
      enum: ["dsa", "machine-coding", "hld", "lld"],
      default: "dsa",
    },
    tags: [String],

    // For DSA / machine-coding problems (auto-evaluated)
    testCases: [{ input: String, expectedOutput: String }],

    // For HLD / LLD problems (manually reviewed)
    rubric: [
      {
        criterion: { type: String }, // e.g. "Scalability", "Database Choice"
        maxScore: { type: Number }, // e.g. 10
        description: { type: String }, // what to look for
      },
    ],
    hints: [String], // guided hints for the candidate
    sampleDiagram: { type: Schema.Types.Mixed, default: null }, // example excalidraw JSON
    requirements: [String], // specific things the design must address

    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Problem = model("Problem", problemSchema);
