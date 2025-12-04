import { pgTable, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const Careers = pgTable("careers", {
  id: varchar("id", { length: 24 }).primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),

  type: varchar("type", { length: 100 }).notNull(),

  shortDescription: varchar("short_description", { length: 500 }),
  longDescription: varchar("long_description", { length: 5000 }),

  // JSON fields (JS-compatible)
  skillsRequired: jsonb("skills_required")
    .$type(() => [])
    .notNull(),

  industries: jsonb("industries")
    .$type(() => [])
    .notNull(),

  icon: varchar("icon", { length: 50 }),

  futureScope: varchar("future_scope", { length: 2000 }),

  averageSalaryMin: integer("average_salary_min"),
  averageSalaryMax: integer("average_salary_max"),

  jobRoles: jsonb("job_roles")
    .$type(() => [{ title: "" }])
    .notNull(),

  seoKeywords: jsonb("seo_keywords")
    .$type(() => [])
    .default([]),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
