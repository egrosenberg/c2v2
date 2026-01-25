import { bigserial, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import type { SuclassWithRelations } from "./subclasses";

const TABLE_NAME = "keeper_classes" as const;

export const keeperClasses = pgTable(TABLE_NAME, {
  // identifiers
  id: uuid("id").primaryKey().defaultRandom(),
  _idx: bigserial("_idx", { mode: "number" }),

  // meta
  _table: text("_table").notNull().default(TABLE_NAME),
  _createdAt: timestamp("_created_at").notNull().defaultNow(),
  _updatedAt: timestamp("_updated_at").notNull().defaultNow(),

  // data
  name: text("name").notNull().unique(),
  canAlways: text("can_always").array(),
});

export const keeperClassesInsertSchema = createInsertSchema(keeperClasses);
export type NewKeeperClass = z.input<typeof keeperClassesInsertSchema>;

export type KeeperClass = typeof keeperClasses.$inferSelect;

export type KeeperClassWithRelations = KeeperClass & {
  subclasses: SuclassWithRelations[];
};
