import z from "zod";
import { database } from "../../index.js";
import { domains, domainsInsertSchema } from "@db/tables/domains";
import { fromZodError } from "zod-validation-error";
import { eq } from "drizzle-orm";

const schema = z.object({
  id: z.string(),
  name: z.string().optional(),
});
type Options = z.input<typeof schema>;

export async function updateDomain(options: Options) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const [record] = await db
      .update(domains)
      .set(parsed)
      .where(eq(domains.id, parsed.id))
      .returning();

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
