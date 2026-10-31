import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userInsertSchema = createInsertSchema(user);
export const userSelectSchema = createSelectSchema(user);
export const userUpdateSchema = createUpdateSchema(user);
