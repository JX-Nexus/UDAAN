import { pgTable, varchar } from "drizzle-orm/pg-core";
import { Careers } from "./careers.schema.js";
import { Courses } from "./courses.schema.js";

export const CareerCourseMap = pgTable("career_course_map", {
  id: varchar("id", { length: 24 }).primaryKey(),

  careerId: varchar("career_id", { length: 24 })
    .notNull()
    .references(() => Careers.id, { onDelete: "cascade" }),

  courseId: varchar("course_id", { length: 24 })
    .notNull()
    .references(() => Courses.id, { onDelete: "cascade" }),
});
