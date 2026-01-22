import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";

export const subclasses = pgTable("subclasses", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  domainId: uuid("domain_id").notNull(),
  classId: uuid("class_id").notNull(),
});

export const subclassesInsertSchema = createInsertSchema(subclasses);
export type NewSubclass = z.input<typeof subclassesInsertSchema>;

export type Subclass = typeof subclasses.$inferSelect;
