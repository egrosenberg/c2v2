import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";

export const domains = pgTable("domains", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
});

export const domainsInsertSchema = createInsertSchema(domains);
export type NewDomain = z.input<typeof domainsInsertSchema>;

export type Domain = typeof domains.$inferSelect;
