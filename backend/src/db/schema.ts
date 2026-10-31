import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
