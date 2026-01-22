import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";

export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  subtype: text("subtype"),
  actions: integer("actions").notNull(),
  focus: integer("focus"),
  range: text("range"),
  numTargets: integer("num_targets"),
  targetType: text("target_type"),
  aoeShape: text("aoe_shape"),
  aoeRadius: integer("aoe_radius"),
  aoeHeight: integer("aoe_height"),
  aoeLength: integer("aoe_length"),
  aoeWidth: integer("aoe_width"),
  sourceType: text("source_type"),
  sourceId: uuid("source_id"),
  description: text("description"),
  damageTypes: text("damage_types"),
  statuses: text("statuses"),
  restoreTypes: text("restore_types"),
  tags: text("tags"),
});

export const skillsInsertSchema = createInsertSchema(skills);
export type NewSkill = z.input<typeof skillsInsertSchema>;

export type Skill = typeof skills.$inferSelect;
