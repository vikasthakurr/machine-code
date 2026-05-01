import { Schema, model } from 'mongoose';

const submissionSchema = new Schema({
  userId:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
  problemId: { type: Schema.Types.ObjectId, ref: 'Problem', required: true },
  language:  { type: String, required: true },
  code:      { type: String, required: true },
  status:    { type: String, enum: ['pending', 'running', 'accepted', 'rejected', 'error'], default: 'pending' },
  result:    { type: Schema.Types.Mixed },
}, { timestamps: true });

export const Submission = model('Submission', submissionSchema);
