import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './auth.model.js';
import { env } from '../../config/env.js';

export function generateToken(userId) {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

export async function register(data) {
  const { email, username, password, collegeName, passingYear, gender, userType, linkedIn, github, website, bio } = data;

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    email, username, password: hashed,
    collegeName, passingYear, gender, userType,
    linkedIn, github, website, bio,
  });

  return sanitize(user);
}

export async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const token = generateToken(user._id);
  return { token, user: sanitize(user) };
}

export async function updateProfile(userId, data) {
  const allowed = ['profilePic', 'bio', 'collegeName', 'passingYear', 'gender', 'userType', 'linkedIn', 'github', 'website', 'username'];
  const updates = Object.fromEntries(Object.entries(data).filter(([k]) => allowed.includes(k)));

  const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
  if (!user) throw new Error('User not found');
  return sanitize(user);
}

// strip password from any user object before returning
function sanitize(user) {
  const { password, __v, ...safe } = user.toObject();
  return safe;
}
