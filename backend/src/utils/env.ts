import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { z } from "zod";

const envFilePath = resolve(dirname(fileURLToPath(import.meta.url)), "../.env");
dotenv.config({ path: envFilePath });

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65_535).default(4000),
  DB_URL: z.url(),
  CORS_ORIGIN: z.url().default("http://localhost:5173"),
});

export type Env = z.infer<typeof envSchema>;
export const env: Env = envSchema.parse(process.env);
