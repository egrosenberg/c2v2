import {
  bigserial,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import type { SuclassWithRelations } from "./subclasses";
import { VIRTUES, type VITALS } from "@db/constants";

const TABLE_NAME = "keeper_classes" as const;

export type RollTableType = {
  heading: string;
  values: string[];
}[];

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
  description: text("description"),
  tenets: text("tenets").array(),
  vitals: jsonb("vitals")
    .$type<Record<(typeof VITALS)[number], string>>()
    .default({ hp: "", gd: "", wd: "" }),
  virtue: text("virtue", { enum: VIRTUES }),
  startingWeapons: jsonb("starting_weapons").$type<RollTableType>(),
  startingArmor: jsonb("starting_armor").$type<RollTableType>(),
  startingBelongings: jsonb("starting_belongings").$type<RollTableType>(),
});

export const keeperClassesInsertSchema = createInsertSchema(keeperClasses);
export type NewKeeperClass = z.input<typeof keeperClassesInsertSchema>;

export type KeeperClass = typeof keeperClasses.$inferSelect;

export type KeeperClassWithRelations = KeeperClass & {
  subclasses: SuclassWithRelations[];
};
