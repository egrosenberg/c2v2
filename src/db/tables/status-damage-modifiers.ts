import { bigserial, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import { statuses } from "./statuses";

const TABLE_NAME = "status_damage_modifiers" as const;

export const statusDamageModifiers = pgTable(TABLE_NAME, {
  // identifier
  _idx: bigserial("_idx", { mode: "number" }).primaryKey(),

  // data
  statusId: uuid("status_id")
    .references(() => statuses.id, {
      onDelete: "cascade",
    })
    .notNull(),

  damageType: text("damage_type").notNull(),
  amount: integer("amount"),
});

export const statusDamageModifiersInsertSchema = createInsertSchema(
  statusDamageModifiers,
);
export type NewStatusDamageModifiers = z.input<
  typeof statusDamageModifiersInsertSchema
>;

export type StatusDamageModifiers = typeof statusDamageModifiers.$inferSelect;
