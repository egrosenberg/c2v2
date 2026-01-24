import z from "zod";
import { database } from "../../index";
import { fromZodError } from "zod-validation-error";
import { eq } from "drizzle-orm";
import { keeperClasses } from "@db/tables/keeper-classes";
import { createUpdateSchema } from "drizzle-zod";
import { subclasses } from "@db/tables/subclasses";

const schema = createUpdateSchema(subclasses).required({ id: true });
type Options = z.input<typeof schema>;

export async function updateSubclass(options: Options) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const [record] = await db
      .update(keeperClasses)
      .set(parsed)
      .where(eq(keeperClasses.id, parsed.id))
      .returning();

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
