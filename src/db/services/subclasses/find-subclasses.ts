import z, { uuid } from "zod";
import { database } from "../../index.js";
import { and, eq, ilike } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import { subclasses, type SuclassWithRelations } from "@db/tables/subclasses";
import { domains } from "@db/tables/domains";
import type { PaginatedResult } from "../index.js";
import { keeperClasses } from "@db/tables/keeper-classes";

const schema = z.object({
  limit: z.number().optional(),
  offset: z.int().optional().default(0),
  filter: z
    .object({
      name: z.string().optional(),
      classId: uuid().optional(),
      domainId: uuid().optional(),
    })
    .optional(),
});

type Options = z.input<typeof schema>;

export async function findSubclasses(
  options: Options = {},
): Promise<PaginatedResult<SuclassWithRelations>> {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const nameFilter = parsed?.filter?.name
      ? ilike(subclasses.name, parsed.filter.name)
      : undefined;

    const classIdFiler = parsed?.filter?.classId
      ? eq(subclasses.classId, parsed.filter.classId)
      : undefined;

    const domainIdFilter = parsed?.filter?.domainId
      ? eq(subclasses.classId, parsed.filter.domainId)
      : undefined;

    const filter = and(nameFilter, classIdFiler, domainIdFilter);

    const query = db
      .select()
      .from(subclasses)
      .innerJoin(domains, eq(domains.id, subclasses.domainId))
      .innerJoin(keeperClasses, eq(keeperClasses.id, subclasses.classId))
      .where(filter)
      .orderBy(subclasses.name)
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
