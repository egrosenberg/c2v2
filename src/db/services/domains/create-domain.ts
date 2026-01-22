import z from "zod";
import { database } from "../../index.js";
import {
  domains,
  domainsInsertSchema,
  type NewDomain,
} from "@db/tables/domains";
import { fromZodError } from "zod-validation-error";
import { getDomain } from "./get-domain.js";

export async function createDomain(options: NewDomain) {
  try {
    const parsed = domainsInsertSchema.parse(options);

    const db = database();

    const existing = await getDomain({ name: parsed.name });
    if (existing) {
      return existing;
    }

    const [record] = await db.insert(domains).values(parsed).returning();

    if (!record) throw new Error("Failed to create domain");

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
