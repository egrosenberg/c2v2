import z from "zod";
import { database } from "../../index.js";
import { fromZodError } from "zod-validation-error";
import { aspectsFilterSchema, type AspectsFilter } from "./types.js";
import { aspects, type AspectWithRelations } from "@db/tables/aspects";
import { createAspectsFilter } from "./lib/create-aspects-filter.js";
import { getAspectRelations } from "./lib/get-aspect-relations.js";

export async function getAspect(
  options: AspectsFilter,
): Promise<AspectWithRelations | null> {
  try {
    const parsed = aspectsFilterSchema.parse(options);

    const db = database();

    const filter = createAspectsFilter(parsed);

    const [record] = await db.select().from(aspects).where(filter).limit(1);

    if (!record) return null;

    return getAspectRelations(record);
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
