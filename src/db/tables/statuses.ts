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

const TABLE_NAME = "statuses" as const;

export const statuses = pgTable(TABLE_NAME, {
  // identifiers
  id: uuid("id").primaryKey().defaultRandom(),
  _idx: bigserial("_idx", { mode: "number" }),

  // meta
  _table: text("_table").notNull().default(TABLE_NAME),
  _createdAt: timestamp("_created_at").notNull().defaultNow(),
  _updatedAt: timestamp("_updated_at").notNull().defaultNow(),

  // data
  name: text("name").notNull().unique(),
  resistedBy: text("resisted_by", { enum: ["gd", "wd"] }),
  duration: integer("duration"),
  description: text("description"),
});

export const statusesInsertSchema = createInsertSchema(statuses);
export type NewStatus = z.input<typeof statusesInsertSchema>;

export type Status = typeof statuses.$inferSelect;
