import { pgTable, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const Colleges = pgTable("colleges", {
  id: varchar("id", { length: 24 }).primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),

  description: varchar("description", { length: 2000 }),
  websiteUrl: varchar("website_url", { length: 500 }),

  establishedYear: integer("established_year"),

  // Gov, Private, Deemed
  type: varchar("type", { length: 100 }),

  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  country: varchar("country", { length: 255 }).notNull(),

  addressLine: varchar("address_line", { length: 500 }),

  // stored as "lat,lng" or JSON
  latitudeLongitude: varchar("latitude_longitude", { length: 100 }),

  contactEmail: varchar("contact_email", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 50 }),

  logoUrl: varchar("logo_url", { length: 500 }),

  createdAt: timestamp("created_at").defaultNow(),
});
