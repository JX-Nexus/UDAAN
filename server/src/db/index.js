// src/db/connectDB.js
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import * as schema from "../schema/schema.js";

dotenv.config();

let db;

export const connectDB = () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL missing in .env — check that first");
    }

    // neon http client
    const sql = neon(process.env.DATABASE_URL);

    // init drizzle
      db = drizzle(sql, { schema })

    console.log("\nPostgreSQL connected using Drizzle ORM");
    return db;
  } catch (err) {
    console.error(" DB connection failed:", err.message);
    process.exit(1);
  }
};

export { db };
