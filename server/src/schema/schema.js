import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: varchar("id", { length: 24 }).primaryKey(),  // if you’re using userUtils.generateObjectId()
  username: varchar("username", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),

  // token management
  refreshToken: varchar("refresh_token", { length: 1000 }),  // nullable (optional)
  refreshTokenCreatedAt: timestamp("refresh_token_created_at").defaultNow(),

  // audit + state
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  lastLoginAt: timestamp("last_login_at"), // nullable (no default)
  failedLoginAttempts: integer("failed_login_attempts").default(0),

  // access control
  role: varchar("role", { length: 50 }).default("user"),
  status: varchar("status", { length: 50 }).default("active"),

  // optional
  avatarUrl: varchar("avatar_url", { length: 500 }),
});
