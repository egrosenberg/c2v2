import z from "zod";
import { database } from "../../index.js";
import { and, eq, ilike } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import { subclasses } from "@db/tables/subclasses";
import { domains } from "@db/tables/domains";
import { keeperClasses } from "@db/tables/keeper-classes";

const schema = z
  .object({ id: z.string(), name: z.never().optional() })
  .or(z.object({ id: z.never().optional(), name: z.string() }));

type Options = z.input<typeof schema>;

export async function getSubclass(options: Options) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const idFilter = parsed?.id ? eq(subclasses.id, parsed.id) : undefined;

    const nameFilter = parsed?.name
      ? ilike(subclasses.name, parsed.name)
      : undefined;

    const filter = and(idFilter, nameFilter);

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
