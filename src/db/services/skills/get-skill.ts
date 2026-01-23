import z from "zod";
import { database } from "../../index.js";
import { fromZodError } from "zod-validation-error";
import { skillsFilterSchema } from "./types.js";
import { createSkillsFilter } from "./lib/create-skills-filter.js";
import { skills, type SkillWithRelations } from "@db/tables/skills";
import { getSkillSource } from "./lib/get-skill-source.js";

const schema = skillsFilterSchema.optional().default({});

type Options = z.input<typeof schema>;

export async function getSkill(
  options: Options,
): Promise<SkillWithRelations | null> {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const filter = createSkillsFilter(parsed);

    const [record] = await db.select().from(skills).where(filter).limit(1);

    if (!record) return null;

    const source = await getSkillSource(record);

    return { ...record, source };
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
