import z from "zod";
import { database } from "../../index.js";
import { and, ilike } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import {
  keeperClasses,
  type KeeperClassWithRelations,
} from "@db/tables/keeper-classes";
import { findSubclasses } from "../subclasses/find-subclasses.js";

const schema = z.object({
  limit: z.number().optional(),
  offset: z.int().optional().default(0),
  filter: z.object({ name: z.string().optional() }).optional(),
});

type Options = z.input<typeof schema>;

export async function findKeeperClasses(options: Options = {}) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const nameFilter = parsed?.filter?.name
      ? ilike(keeperClasses.name, parsed.filter.name)
      : undefined;

    const filter = and(nameFilter);

    const query = db
      .select()
      .from(keeperClasses)
      .where(filter)
      .orderBy(keeperClasses.name)
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
