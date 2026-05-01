import { Schema, model } from 'mongoose';

const problemSchema = new Schema({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  description: { type: String, required: true },
  difficulty:  { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  tags:        [String],
  testCases:   [{ input: String, expectedOutput: String }],
  isPublished: { type: Boolean, default: false },
}, { timestamps: true });

export const Problem = model('Problem', problemSchema);
