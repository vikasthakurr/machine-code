import { z } from "zod";

// Code submission (DSA / machine-coding)
export const submitCodeSchema = z.object({
  problemId: z.string().min(1, "Problem ID is required"),
  type: z.literal("code"),
  language: z.enum(["javascript", "python", "java"], {
    errorMap: () => ({
      message: "Language must be one of: javascript, python, java",
    }),
  }),
  code: z
    .string()
    .min(1, "Code cannot be empty")
    .max(50000, "Code exceeds maximum length"),
});

// Design submission (HLD / LLD)
export const submitDesignSchema = z.object({
  problemId: z.string().min(1, "Problem ID is required"),
  type: z.literal("design"),
  diagram: z.any().optional(), // Excalidraw JSON (validated loosely — it's a complex object)
  notes: z.string().max(10000).optional(), // Markdown explanation
  apiDesign: z.string().max(20000).optional(), // API contracts / pseudocode
});

// Union schema — accepts either code or design submissions
export const submitSchema = z.discriminatedUnion("type", [
  submitCodeSchema,
  submitDesignSchema,
]);

// Review schema (for reviewing design submissions)
export const reviewSchema = z.object({
  scores: z
    .array(
      z.object({
        criterion: z.string().min(1),
        score: z.number().min(0),
        maxScore: z.number().min(1),
        feedback: z.string().optional().default(""),
      }),
    )
    .min(1, "At least one score is required"),
  overallFeedback: z.string().max(5000).optional().default(""),
});
