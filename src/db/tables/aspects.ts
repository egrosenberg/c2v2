import type { Source } from "@db/services/index";
import { bigserial, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import type { Skill } from "./skills";

const TABLE_NAME = "aspects" as const;

export const aspects = pgTable(TABLE_NAME, {
  // identifiers
  id: uuid("id").primaryKey().defaultRandom(),
  _idx: bigserial("_idx", { mode: "number" }),

  // meta
  _table: text("_table").notNull().default(TABLE_NAME),
  _createdAt: timestamp("_created_at").notNull().defaultNow(),
  _updatedAt: timestamp("_updated_at").notNull().defaultNow(),

  // data
  name: text("name").notNull(),
  category: text("category").notNull(),
  categoryPrefix: text("category_prefix"),
  sourceType: text("source_type"),
  sourceId: uuid("source_id"),
  description: text("description"),
});

export const aspectsInsertSchema = createInsertSchema(aspects);
export type NewAspect = z.input<typeof aspectsInsertSchema>;

export type Aspect = typeof aspects.$inferSelect;
export type AspectWithRelations = Aspect & {
  source: Source;
  skills: Skill[];
};
