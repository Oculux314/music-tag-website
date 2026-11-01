import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import { foreignKey, index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { user } from "./user";
import { userMedia } from "./userMedia";

export const mediaGroup = pgTable(
  "media_group",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    defaultMediaId: uuid("default_media_id").notNull(),
  },
  (table) => [
    index("media_group_user_id_idx").on(table.userId),
    index("media_group_default_media_id_idx").on(table.defaultMediaId),
    foreignKey({
      name: "media_group_default_media_same_group_fkey",
      columns: [table.defaultMediaId, table.id],
      foreignColumns: [userMedia.id, userMedia.mediaGroupId],
    }),
  ],
);

export const mediaGroupInsertSchema = createInsertSchema(mediaGroup);
export const mediaGroupSelectSchema = createSelectSchema(mediaGroup);
export const mediaGroupUpdateSchema = createUpdateSchema(mediaGroup);
