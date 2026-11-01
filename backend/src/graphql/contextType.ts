import type { db } from "@/db";
import type { auth } from "@/utils/auth";

export type GraphQLContext = {
  db: typeof db;
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
};
