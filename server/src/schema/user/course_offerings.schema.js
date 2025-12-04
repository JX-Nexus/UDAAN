import { pgTable, varchar, integer, numeric } from "drizzle-orm/pg-core";
import { Colleges } from "./collages.schema.js";
import { Courses } from "./courses.schema.js";

export const CourseOfferings = pgTable("course_offerings", {
  id: varchar("id", { length: 24 }).primaryKey(),

  collegeId: varchar("college_id", { length: 24 })
    .notNull()
    .references(() => Colleges.id, { onDelete: "cascade" }),

  courseId: varchar("course_id", { length: 24 })
    .notNull()
    .references(() => Courses.id, { onDelete: "cascade" }),

  cutoffScore: integer("cutoff_score"), // nullable because not all courses require cutoffs

  fees: numeric("fees", { precision: 12, scale: 2 }), // supports ₹XX,XX,XXX.00

  entranceExam: varchar("entrance_exam", { length: 255 }), // e.g. JEE, NEET, CUET
});
