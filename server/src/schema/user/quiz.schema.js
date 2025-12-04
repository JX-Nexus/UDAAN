import { Users } from "./user.schema.js";
import { pgTable, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const QuizAttempts = pgTable("quiz_attempts", {
  id: varchar("id", { length: 24 }).primaryKey(),

  // FK → users.id
  userId: varchar("user_id", { length: 24 })
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }),

  // store raw quiz array (73 Q)
  rawAnswers: jsonb("raw_answers").notNull(),

  // preprocessed aggregated scores (Interest, Aptitude, Personality…)
  processedScores: jsonb("processed_scores").notNull(),

  // recommendations (3 objects)
  recommendations: jsonb("recommendations").notNull(),

  // archetype object
  archetype: jsonb("archetype").notNull(),

  // feedback array from engine
  feedback: jsonb("feedback").notNull(),

  // attempt no (1, 2, 3…)
  attemptNo: integer("attempt_no").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
