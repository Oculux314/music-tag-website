import { createAuthClient } from "better-auth/react";
import { env } from "./env.js";

export const authClient = createAuthClient({
  baseURL: env.VITE_BACKEND_URL,
});
