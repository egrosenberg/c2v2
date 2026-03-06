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
import { statuses } from "./statuses";

export const STATUS_OPERATIONS = ["combine", "block", "remove", "set"] as const;

const TABLE_NAME = "status_combinations" as const;

export const statusCombinations = pgTable(TABLE_NAME, {
  // identifier
  _idx: bigserial("_idx", { mode: "number" }).primaryKey(),

  // data
  statusA: uuid("status_a")
    .references(() => statuses.id, {
      onDelete: "cascade",
    })
    .notNull(),
  statusB: uuid("status_b")
    .references(() => statuses.id, {
      onDelete: "cascade",
    })
    .notNull(),

  operation: text("operation", { enum: STATUS_OPERATIONS }),

  product: uuid("product")
    .unique()
    .references(() => statuses.id, {
      onDelete: "cascade",
    }),
});

export const statusCombinationsInsertSchema =
  createInsertSchema(statusCombinations);
export type NewStatusCombination = z.input<
  typeof statusCombinationsInsertSchema
>;

export type StatusCombination = typeof statusCombinations.$inferSelect;
