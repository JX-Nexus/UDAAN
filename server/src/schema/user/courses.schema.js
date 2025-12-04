import { pgTable, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const Courses = pgTable("courses", {
  id: varchar("id", { length: 24 }).primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),

  description: varchar("description", { length: 2000 }),

  durationYears: integer("duration_years"), // e.g., 3, 4, 5

  degreeType: varchar("degree_type", { length: 100 }), 
  // examples: "B.Tech", "B.Sc", "Diploma", "Integrated Masters"

  whatYouLearn: varchar("what_you_learn", { length: 3000 }), 
  // can convert to JSONB later if needed

  createdAt: timestamp("created_at").defaultNow(),
});
