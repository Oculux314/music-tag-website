import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";

export const media = pgTable(
  "media",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    source: text("source").notNull(),
    name: text("name").notNull(),
  },
  (table) => [index("media_source_idx").on(table.source)],
);

export const mediaInsertSchema = createInsertSchema(media, { source: z.url() });
export const mediaSelectSchema = createSelectSchema(media, { source: z.url() });
export const mediaUpdateSchema = createUpdateSchema(media, { source: z.url() });
