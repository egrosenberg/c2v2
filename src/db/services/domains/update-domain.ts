import z from "zod";
import { database } from "../../index";
import { domains } from "@db/tables/domains";
import { fromZodError } from "zod-validation-error";
import { eq } from "drizzle-orm";
import { createUpdateSchema } from "drizzle-zod";

const schema = createUpdateSchema(domains).required({ id: true });
type Options = z.input<typeof schema>;

export async function updateDomain(options: Options) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const [record] = await db
      .update(domains)
      .set({ ...parsed, _updatedAt: new Date(Date.now()) })
      .where(eq(domains.id, parsed.id))
      .returning();

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
