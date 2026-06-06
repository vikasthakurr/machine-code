import { Schema, model } from "mongoose";

const executionSchema = new Schema(
  {
    submissionId: { type: Schema.Types.ObjectId, required: true },
    stdout: String,
    stderr: String,
    exitCode: Number,
    duration: Number,
    passed: Boolean,
    totalTests: { type: Number, default: 0 },
    passedTests: { type: Number, default: 0 },
    testResults: [
      {
        input: String,
        expectedOutput: String,
        actualOutput: String,
        passed: Boolean,
      },
    ],
  },
  { timestamps: true },
);

export const Execution = model("Execution", executionSchema);
