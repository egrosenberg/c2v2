import z from "zod";
import { database } from "../../index";
import { fromZodError } from "zod-validation-error";
import { skills, skillsInsertSchema, type NewSkill } from "@db/tables/skills";
import { searchIndex } from "@db/tables/search-index";

export async function createSkill(options: NewSkill) {
  try {
    const parsed = skillsInsertSchema.parse(options);

    const db = database();

    const [record] = await db
      .insert(skills)
      .values(parsed)
      .onConflictDoNothing()
      .returning();

    if (!record) throw new Error("Failed to create skill");

    await db.insert(searchIndex).values({ skill: record.id });

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
