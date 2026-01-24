import z from "zod";
import { database } from "../../index";
import { eq } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import { skills } from "@db/tables/skills";

const schema = z.object({ id: z.string() });

type Options = z.input<typeof schema>;

export async function deleteSkill(options: Options) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const idFilter = parsed?.id ? eq(skills.id, parsed.id) : undefined;

    const [record] = await db.delete(skills).where(idFilter).returning();

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
