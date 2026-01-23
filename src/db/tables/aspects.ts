import type { Source } from "@db/services/index";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import type { Skill } from "./skills.js";

export const aspects = pgTable("aspects", {
  id: uuid("id").primaryKey().defaultRandom(),
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
