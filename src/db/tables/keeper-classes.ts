import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
import type { SuclassWithRelations } from "./subclasses";

export const keeperClasses = pgTable("keeper_classes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  canAlways: text("can_always").array(),
});

export const keeperClassesInsertSchema = createInsertSchema(keeperClasses);
export type NewKeeperClass = z.input<typeof keeperClassesInsertSchema>;

export type KeeperClass = typeof keeperClasses.$inferSelect;

export type KeeperClassWithRelations = KeeperClass & {
  subclasses: SuclassWithRelations[];
};
