import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";

export const domains = pgTable("domains", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export const domainsInserSchema = createInsertSchema(domains);
export type NewDomain = z.input<typeof domainsInserSchema>;

export type Skill = typeof domains.$inferSelect;
