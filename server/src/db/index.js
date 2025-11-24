// src/db/connectDB.js
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/node-postgres";
import {Pool} from "pg";
import dotenv from "dotenv";
import * as schema from "../schema/index.js"; //adjusting path

dotenv.config();

let db;

export const connectDB = () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL missing in .env — check that first");
    }

    // neon http client
    // const sql = neon(process.env.DATABASE_URL);
    const sql = new Pool({
      connectionString: process.env.DATABASE_URL,
    })

    // init drizzle
      db = drizzle(sql, { schema })
    console.log("\n-----------------------------------------------");
    console.log("PostgreSQL connected using Drizzle ORM");
    console.log("-----------------------------------------------");

    return db;
  } catch (err) {
    console.error(" DB connection failed:", err.message);
    process.exit(1);
  }
};

export { db };
