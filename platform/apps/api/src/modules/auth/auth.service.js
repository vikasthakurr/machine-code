import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './auth.model.js';
import { env } from '../../config/env.js';

export async function register(email, username, password) {
  const hashed = await bcrypt.hash(password, 10);
  const user   = await User.create({ email, username, password: hashed });
  return { id: user._id, email: user.email, username: user.username };
}

export async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const token = jwt.sign({ sub: user._id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
  return { token, user: { id: user._id, email: user.email, username: user.username } };
}
