import z from "zod";
import { database } from "../../index.js";
import { and, asc, desc, ilike } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import {
  keeperClasses,
  type KeeperClassWithRelations,
} from "@db/tables/keeper-classes";
import { findSubclasses } from "../subclasses/find-subclasses.js";
import {
  keeperClassesFieldsMap,
  keeperClassesFilterSchema,
  type KeeperClassesField,
} from "./types.js";
import { createKeeperClassesFilter } from "./lib/create-keeper-classes-filter.js";

const schema = z.object({
  filter: keeperClassesFilterSchema.optional().default({}),
  limit: z.number().optional(),
  offset: z.int().optional().default(0),
  orderBy: z.custom<KeeperClassesField>().optional().default("name"),
  order: z
    .union([z.literal("asc"), z.literal("desc")])
    .optional()
    .default("asc"),
});

type Options = z.input<typeof schema>;

export async function findKeeperClasses(options: Options = {}) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const filter = createKeeperClassesFilter(parsed.filter);

    const order =
      parsed.order === "asc"
        ? asc(keeperClassesFieldsMap[parsed.orderBy]?.column)
        : desc(keeperClassesFieldsMap[parsed.orderBy]?.column);

    const query = db
      .select()
      .from(keeperClasses)
      .where(filter)
      .orderBy(order)
      .$dynamic();

    const total = await db.$count(query);

    if (parsed.limit) {
      query.limit(parsed.limit).offset(parsed.offset * parsed.limit);
    }

    const result = await query;

    const records: KeeperClassWithRelations[] = [];
    for (const record of result) {
      const { records: subs } = await findSubclasses({
        filter: { classId: record.id },
      });
      records.push({ ...record, subclasses: subs });
    }

    return { records, total };
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
