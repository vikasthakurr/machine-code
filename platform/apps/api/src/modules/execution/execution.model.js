import { Schema, model } from 'mongoose';

const executionSchema = new Schema({
  submissionId: { type: Schema.Types.ObjectId, ref: 'Submission', required: true },
  stdout:   String,
  stderr:   String,
  exitCode: Number,
  duration: Number,
  passed:   Boolean,
}, { timestamps: true });

export const Execution = model('Execution', executionSchema);
