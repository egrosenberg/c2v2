import { bigserial, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import { statuses } from "./statuses";

const TABLE_NAME = "status_damage_ticks" as const;

export const statusDamageTicks = pgTable(TABLE_NAME, {
  // identifier
  _idx: bigserial("_idx", { mode: "number" }).primaryKey(),

  // data
  statusId: uuid("status_id")
    .references(() => statuses.id, {
      onDelete: "cascade",
    })
    .notNull(),

  damageType: text("damage_type").notNull(),
  formula: integer("amount"),
});

export const statusDamageTicksInsertSchema =
  createInsertSchema(statusDamageTicks);
export type NewStatusDamageModifiers = z.input<
  typeof statusDamageTicksInsertSchema
>;

export type StatusDamageModifiers = typeof statusDamageTicks.$inferSelect;
