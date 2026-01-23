import z from "zod";
import { database } from "../../index.js";
import { and, eq, ilike } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import { subclasses } from "@db/tables/subclasses";
import { domains } from "@db/tables/domains";
import { keeperClasses } from "@db/tables/keeper-classes";
import { createSubclassFilter } from "./lib/create-subclass-filter.js";
import { subclassesFilterSchema, type SubclassesFilter } from "./types.js";

export async function getSubclass(options: SubclassesFilter) {
  try {
    const parsed = subclassesFilterSchema.parse(options);

    const db = database();

    const filter = createSubclassFilter(parsed);

    const [record] = await db
      .select()
      .from(subclasses)
      .innerJoin(domains, eq(domains.id, subclasses.domainId))
      .innerJoin(keeperClasses, eq(keeperClasses.id, subclasses.classId))
      .where(filter)
      .limit(1);

    if (!record) return null;

    return {
      ...record.subclasses,
      domain: record.domains,
      class: record.keeper_classes,
    };
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
