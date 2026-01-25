import {
  bigserial,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import type { Source } from "@db/services/index";

const TABLE_NAME = "skills" as const;

export const skills = pgTable(TABLE_NAME, {
  // identifiers
  id: uuid("id").primaryKey().defaultRandom(),
  _idx: bigserial("_idx", { mode: "number" }),

  // meta
  _table: text("_table").notNull().default(TABLE_NAME),
  _createdAt: timestamp("_created_at").notNull().defaultNow(),
  _updatedAt: timestamp("_updated_at").notNull().defaultNow(),

  // data
  name: text("name").notNull().unique(),
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

export type SkillWithRelations = Skill & {
  source: Source;
};
