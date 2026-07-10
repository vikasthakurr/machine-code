import { z } from "zod";

export const createProblemSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10),
  difficulty: z.enum(["easy", "medium", "hard"]),
  category: z.enum(["component", "feature", "mini-app", "layout", "interaction"]).optional().default("component"),
  tags: z.array(z.string()).optional().default([]),
  timeLimit: z.number().min(10).max(180).optional().default(45),
  requirements: z.array(z.string()).optional().default([]),
  starterCode: z.object({
    html: z.string().optional().default(""),
    css: z.string().optional().default(""),
    js: z.string().optional().default(""),
  }).optional().default({}),
  hints: z.array(z.string()).optional().default([]),
  referenceImage: z.string().url().optional().nullable(),
  isPublished: z.boolean().optional().default(false),
});
