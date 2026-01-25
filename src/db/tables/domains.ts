import { bigserial, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";

const TABLE_NAME = "domains" as const;

export const domains = pgTable(TABLE_NAME, {
  // identifiers
  id: uuid("id").primaryKey().defaultRandom(),
  _idx: bigserial("_idx", { mode: "number" }),

  // meta
  _table: text("_table").notNull().default(TABLE_NAME),
  _createdAt: timestamp("_created_at").notNull().defaultNow(),
  _updatedAt: timestamp("_updated_at").notNull().defaultNow(),

  // data
  name: text("name").notNull().unique(),
});

export const domainsInsertSchema = createInsertSchema(domains);
export type NewDomain = z.input<typeof domainsInsertSchema>;

export type Domain = typeof domains.$inferSelect;
