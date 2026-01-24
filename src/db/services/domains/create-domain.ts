import z from "zod";
import { database } from "../../index";
import {
  domains,
  domainsInsertSchema,
  type NewDomain,
} from "@db/tables/domains";
import { fromZodError } from "zod-validation-error";
import { searchIndex } from "@db/tables/search-index";

export async function createDomain(options: NewDomain) {
  try {
    const parsed = domainsInsertSchema.parse(options);

    const db = database();

    const [record] = await db
      .insert(domains)
      .values(parsed)
      .onConflictDoNothing()
      .returning();

    if (!record) throw new Error("Failed to create domain");

    await db.insert(searchIndex).values({ domain: record.id });

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
