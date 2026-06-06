import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(30),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  collegeName: z.string().optional().nullable(),
  passingYear: z.number().min(2000).max(2100).optional().nullable(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional().nullable(),
  userType: z.enum(['student', 'working_professional', 'other']).optional().nullable(),
  bio: z.string().max(300).optional().nullable(),
  linkedIn: z.string().url().optional().nullable(),
  github: z.string().url().optional().nullable(),
  website: z.string().url().optional().nullable(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  profilePic: z.string().url().optional().nullable(),
  bio: z.string().max(300).optional().nullable(),
  collegeName: z.string().optional().nullable(),
  passingYear: z.number().min(2000).max(2100).optional().nullable(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional().nullable(),
  userType: z.enum(['student', 'working_professional', 'other']).optional().nullable(),
  linkedIn: z.string().url().optional().nullable(),
  github: z.string().url().optional().nullable(),
  website: z.string().url().optional().nullable(),
});
