import z from "zod";
import { database } from "../../index";

import { fromZodError } from "zod-validation-error";
import {
  keeperClasses,
  keeperClassesInsertSchema,
  type NewKeeperClass,
} from "@db/tables/keeper-classes";
import { searchIndex } from "@db/tables/search-index";

export async function createKeeperClass(options: NewKeeperClass) {
  try {
    const parsed = keeperClassesInsertSchema.parse(options);

    const db = database();

    const [record] = await db
      .insert(keeperClasses)
      .values(parsed)
      .onConflictDoNothing()
      .returning();

    if (!record) throw new Error("Failed to create domain");

    await db.insert(searchIndex).values({ keeperClass: record.id });

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
