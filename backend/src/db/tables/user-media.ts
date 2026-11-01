import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import {
  index,
  pgTable,
  text,
  type AnyPgColumn,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { media } from "./media";
import { mediaGroup } from "./media-group";

export const userMedia = pgTable(
  "user_media",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    mediaId: uuid("media_id")
      .notNull()
      .references(() => media.id),
    mediaGroupId: uuid("media_group_id")
      .notNull()
      .references((): AnyPgColumn => mediaGroup.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
  },
  (table) => [
    index("user_media_media_id_idx").on(table.mediaId),
    index("user_media_media_group_id_idx").on(table.mediaGroupId),
    unique("user_media_id_group_unique").on(table.id, table.mediaGroupId),
  ],
);

export const userMediaInsertSchema = createInsertSchema(userMedia);
export const userMediaSelectSchema = createSelectSchema(userMedia);
export const userMediaUpdateSchema = createUpdateSchema(userMedia);
