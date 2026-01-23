import z, { uuid } from "zod";
import { database } from "../../index.js";
import { asc, desc } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import type { PaginatedResult, SourceType } from "../index.js";
import {
  aspectsFieldsMap,
  aspectsFilterSchema,
  type AspectsField,
} from "./types.js";
import { getSource } from "../_lib/get-source.js";
import { createAspectsFilter } from "./lib/create-aspects-filter.js";
import { aspects, type AspectWithRelations } from "@db/tables/aspects";
import { getAspectRelations } from "./lib/get-aspect-relations.js";

const schema = z.object({
  filter: aspectsFilterSchema.optional().default({}),
  limit: z.number().optional(),
  offset: z.int().optional().default(0),
  orderBy: z.custom<AspectsField>().optional().default("name"),
  order: z
    .union([z.literal("asc"), z.literal("desc")])
    .optional()
    .default("asc"),
});

type Options = z.input<typeof schema>;

export async function findAspects(
  options: Options = {},
): Promise<PaginatedResult<AspectWithRelations>> {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const order =
      parsed.order === "asc"
        ? asc(aspectsFieldsMap[parsed.orderBy].column)
        : desc(aspectsFieldsMap[parsed.orderBy].column);

    const filter = createAspectsFilter(parsed.filter);

    const query = db
      .select()
      .from(aspects)
      .where(filter)
      .orderBy(order)
      .$dynamic();

    const total = await db.$count(query);

    if (parsed.limit) {
      query.limit(parsed.limit).offset(parsed.offset * parsed.limit);
    }

    const result = await query;

    const records: AspectWithRelations[] = [];

    for (const record of result) {
      const withRelations = await getAspectRelations(record);
      records.push(withRelations);
    }

    return {
      records,
      total,
    };
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
