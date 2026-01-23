import z from "zod";
import { database } from "../../index.js";
import { eq } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import { aspects } from "@db/tables/aspects";

const schema = z.object({ id: z.string() });

type Options = z.input<typeof schema>;

export async function deleteAspect(options: Options) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const idFilter = parsed?.id ? eq(aspects.id, parsed.id) : undefined;

    const [record] = await db.delete(aspects).where(idFilter).returning();

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
