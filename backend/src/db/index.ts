import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { authRelations } from "@/db/schema.js";
import { env } from "@/utils/env.js";

export const pool = new Pool({ connectionString: env.DB_URL });
export const db = drizzle({ client: pool, relations: authRelations });
