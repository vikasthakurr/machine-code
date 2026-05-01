import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

export const User = model('User', userSchema);
