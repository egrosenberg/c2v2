import z from "zod";
import { database } from "../../index";
import { fromZodError } from "zod-validation-error";
import { eq } from "drizzle-orm";
import { createUpdateSchema } from "drizzle-zod";
import { skills } from "@db/tables/skills";

const schema = createUpdateSchema(skills).required({ id: true });
type Options = z.input<typeof schema>;

export async function updateSkill(options: Options) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const [record] = await db
      .update(skills)
      .set(parsed)
      .where(eq(skills.id, parsed.id))
      .returning();

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
