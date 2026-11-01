import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { authRelations } from "@/db/schema";
import { env } from "@/utils/env";

export const pool = new Pool({ connectionString: env.DB_URL });
export const db = drizzle({ client: pool, relations: authRelations });
