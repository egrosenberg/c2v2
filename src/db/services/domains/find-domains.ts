import z from "zod";
import { database } from "../../index";
import { domains } from "@db/tables/domains";
import { and, eq, ilike } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";

const schema = z.object({
  limit: z.number().optional(),
  offset: z.int().optional().default(0),
  filter: z.object({ name: z.string().optional() }).optional(),
});

type Options = z.input<typeof schema>;

export async function findDomains(options: Options = {}) {
  try {
    const parsed = schema.parse(options);

    const db = database();
    const nameFilter = parsed?.filter?.name
      ? ilike(domains.name, parsed.filter.name)
      : undefined;

    const filter = and(nameFilter);

    const query = db
      .select()
      .from(domains)
      .where(filter)
      .orderBy(domains.name)
      .$dynamic();

    const total = await db.$count(query);

    if (parsed.limit) {
      query.limit(parsed.limit).offset(parsed.offset * parsed.limit);
    }

    const records = await query;

    return { records, total };
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
