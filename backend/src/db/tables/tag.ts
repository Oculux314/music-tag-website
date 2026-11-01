import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { mediaGroup } from "./mediaGroup";

export const tag = pgTable(
  "tag",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    mediaGroupId: uuid("media_group_id")
      .notNull()
      .references(() => mediaGroup.id, { onDelete: "cascade" }),
  },
  (table) => [index("tag_media_group_id_idx").on(table.mediaGroupId)],
);

export const tagInsertSchema = createInsertSchema(tag);
export const tagSelectSchema = createSelectSchema(tag);
export const tagUpdateSchema = createUpdateSchema(tag);
