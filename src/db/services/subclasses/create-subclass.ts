import z from "zod";
import { database } from "../../index";

import { fromZodError } from "zod-validation-error";
import {
  subclasses,
  subclassesInsertSchema,
  type NewSubclass,
} from "@db/tables/subclasses";
import { searchIndex } from "@db/tables/search-index";

export async function createSubclass(options: NewSubclass) {
  try {
    const parsed = subclassesInsertSchema.parse(options);

    const db = database();

    const [record] = await db
      .insert(subclasses)
      .values(parsed)
      .onConflictDoNothing()
      .returning();

    if (!record) throw new Error("Failed to create domain");

    await db.insert(searchIndex).values({ subclass: record.id });

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
