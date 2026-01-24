import z from "zod";
import { database } from "../../index";
import { and, eq, ilike } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import { keeperClasses } from "@db/tables/keeper-classes";

const schema = z
  .object({ id: z.string(), name: z.never().optional() })
  .or(z.object({ id: z.never().optional(), name: z.string() }));

type Options = z.input<typeof schema>;

export async function deleteKeeperClass(options: Options) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const idFilter = parsed?.id ? eq(keeperClasses.id, parsed.id) : undefined;

    const nameFilter = parsed?.name
      ? ilike(keeperClasses.name, parsed.name)
      : undefined;

    const filter = and(idFilter, nameFilter);

    const [record] = await db.delete(keeperClasses).where(filter).returning();

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
