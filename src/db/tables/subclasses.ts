import { bigserial, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import type { Domain } from "./domains";

const TABLE_NAME = "subclasses" as const;

export const subclasses = pgTable(TABLE_NAME, {
  // identifiers
  id: uuid("id").primaryKey().defaultRandom(),
  _idx: bigserial("_idx", { mode: "number" }),

  // meta
  _table: text("_table").notNull().default(TABLE_NAME),
  _createdAt: timestamp("_created_at").notNull().defaultNow(),
  _updatedAt: timestamp("_updated_at").notNull().defaultNow(),

  // data
  name: text("name").notNull().unique(),
  domainId: uuid("domain_id").notNull(),
  classId: uuid("class_id").notNull(),
});

export const subclassesInsertSchema = createInsertSchema(subclasses);
export type NewSubclass = z.input<typeof subclassesInsertSchema>;

export type Subclass = typeof subclasses.$inferSelect;
export type SuclassWithRelations = Subclass & {
  domain: Domain;
};
