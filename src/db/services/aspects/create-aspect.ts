import z from "zod";
import { database } from "../../index";
import { fromZodError } from "zod-validation-error";
import {
  aspects,
  aspectsInsertSchema,
  type NewAspect,
} from "@db/tables/aspects";
import { searchIndex } from "@db/tables/search-index";

export async function createAspect(options: NewAspect) {
  try {
    const parsed = aspectsInsertSchema.parse(options);

    const db = database();

    const [record] = await db
      .insert(aspects)
      .values(parsed)
      .onConflictDoNothing()
      .returning();

    if (!record) throw new Error("Failed to create domain");

    await db.insert(searchIndex).values({ aspect: record.id });

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
