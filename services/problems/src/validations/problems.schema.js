import { z } from "zod";

export const createProblemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  slug: z
    .string()
    .min(3)
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only",
    ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  type: z
    .enum(["dsa", "machine-coding", "hld", "lld"])
    .optional()
    .default("dsa"),
  tags: z.array(z.string()).optional().default([]),

  // DSA / machine-coding
  testCases: z
    .array(
      z.object({
        input: z.string(),
        expectedOutput: z.string(),
      }),
    )
    .optional()
    .default([]),

  // HLD / LLD
  rubric: z
    .array(
      z.object({
        criterion: z.string().min(1),
        maxScore: z.number().min(1),
        description: z.string().optional().default(""),
      }),
    )
    .optional()
    .default([]),
  hints: z.array(z.string()).optional().default([]),
  requirements: z.array(z.string()).optional().default([]),
  sampleDiagram: z.any().optional().nullable(),

  isPublished: z.boolean().optional().default(false),
});
