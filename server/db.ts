import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Connect to Render PostgreSQL using postgres-js
const client = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// Create a Drizzle ORM instance
export const db = drizzle(client);
