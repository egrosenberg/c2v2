import z from "zod";
import { database } from "../../index";
import { fromZodError } from "zod-validation-error";
import { skillsFilterSchema } from "./types";
import { createSkillsFilter } from "./lib/create-skills-filter";
import { skills, type SkillWithRelations } from "@db/tables/skills";
import { getSource } from "../_lib/get-source";
import { withoutSource, type SourceType } from "../index";

const schema = skillsFilterSchema.optional().default({}).and(withoutSource);

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

    const source = parsed.withoutSource
      ? null
      : await getSource({
          sourceType: record.sourceType as SourceType,
          sourceId: record.sourceId,
        });

    return { ...record, source };
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
