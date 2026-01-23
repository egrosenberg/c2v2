import z from "zod";
import { database } from "../../index.js";
import { asc, desc, eq } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import { subclasses, type SuclassWithRelations } from "@db/tables/subclasses";
import { domains } from "@db/tables/domains";
import type { PaginatedResult } from "../index.js";
import { keeperClasses } from "@db/tables/keeper-classes";
import {
  subclassesFieldsMap,
  subclassesFilterSchema,
  type SubclassesField,
} from "./types.js";
import { createSubclassFilter } from "./lib/create-subclass-filter.js";

const schema = z.object({
  filter: subclassesFilterSchema.optional().default({}),
  limit: z.number().optional(),
  offset: z.int().optional().default(0),
  orderBy: z.custom<SubclassesField>().optional().default("name"),
  order: z
    .union([z.literal("asc"), z.literal("desc")])
    .optional()
    .default("asc"),
});

type Options = z.input<typeof schema>;

export async function findSubclasses(
  options: Options = {},
): Promise<PaginatedResult<SuclassWithRelations>> {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const filter = createSubclassFilter(parsed.filter);

    const order =
      parsed.order === "asc"
        ? asc(subclassesFieldsMap[parsed.orderBy].column)
        : desc(subclassesFieldsMap[parsed.orderBy].column);

    const query = db
      .select()
      .from(subclasses)
      .innerJoin(domains, eq(domains.id, subclasses.domainId))
      .innerJoin(keeperClasses, eq(keeperClasses.id, subclasses.classId))
      .where(filter)
      .orderBy(order)
      .$dynamic();

    const total = await db.$count(query);

    if (parsed.limit) {
      query.limit(parsed.limit).offset(parsed.offset * parsed.limit);
    }

    const records = await query;

    return {
      records: records.map((record) => ({
        ...record.subclasses,
        domain: record.domains,
        class: record.keeper_classes,
      })),
      total,
    };
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
