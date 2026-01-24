import z from "zod";
import { database } from "../../index";
import { fromZodError } from "zod-validation-error";
import { keeperClasses } from "@db/tables/keeper-classes";
import { findSubclasses } from "../subclasses/find-subclasses";
import { keeperClassesFilterSchema, type KeeperClassesFilter } from "./types";
import { createKeeperClassesFilter } from "./lib/create-keeper-classes-filter";

export async function getKeeperClass(options: KeeperClassesFilter) {
  try {
    const parsed = keeperClassesFilterSchema.parse(options);

    const db = database();

    const filter = createKeeperClassesFilter(parsed);

    const [record] = await db
      .select()
      .from(keeperClasses)
      .where(filter)
      .limit(1);

    if (!record) return null;

    const { records: subclasses } = await findSubclasses({
      filter: { classId: record.id },
    });

    return { ...record, subclasses };
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
