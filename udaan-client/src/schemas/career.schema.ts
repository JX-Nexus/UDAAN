import { z } from "zod";

// ✅ Base structure for each category (trait → score)
const traitScoresSchema = z.record(
  z.string(),
  z.number().min(1).max(7, "Score must be between 1 and 7")
)

// ✅ Processed Data Schema
export const processedDataSchema = z.object({
  Interest: traitScoresSchema.optional(),
  Aptitude: traitScoresSchema.optional(),
  SkillLevel: traitScoresSchema.optional(),
  Personality: traitScoresSchema.optional(),
  ValuesMotivation: traitScoresSchema.optional(),
})
export type ProcessedDataSchema = z.infer<typeof processedDataSchema>

// ✅ Raw Quiz Answers Schema
const quizAnswerSchema = z.object({
  questionId: z.number(),
  category: z.string(),
  subfield: z.string().optional(),
  score: z.number().min(1).max(7),
})

export const rawQuizSchema = z.object({
  userId: z.string().optional(),
  quizAnswers: z.array(quizAnswerSchema),
})
export type RawQuizSchema = z.infer<typeof rawQuizSchema>

// ✅ Combined schema (if ever needed together)
export const createCareerSchema = z.object({
  userId: z.string().optional(),
  quizAnswers: z.array(quizAnswerSchema),
  processedData: processedDataSchema,
})
export type CreateCareerSchema = z.infer<typeof createCareerSchema>
