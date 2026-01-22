import z from "zod";
import { database } from "../../index.js";
import { domains } from "@db/tables/domains";
import { and, eq, ilike } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";

const schema = z
  .object({ id: z.string(), name: z.never().optional() })
  .or(z.object({ id: z.never().optional(), name: z.string() }));

type Options = z.input<typeof schema>;

export async function getDomain(options: Options) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const idFilter = parsed?.id ? eq(domains.id, parsed.id) : undefined;

    const nameFilter = parsed?.name
      ? ilike(domains.name, parsed.name)
      : undefined;

    const filter = and(idFilter, nameFilter);

    const [record] = await db.select().from(domains).where(filter).limit(1);

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
