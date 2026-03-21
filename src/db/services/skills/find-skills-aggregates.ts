import z from "zod";
import { database } from "../../index";
import { and, asc, desc, isNotNull } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import type { SourceType } from "../index";
import { skills, type SkillWithRelations } from "@db/tables/skills";
import { skillsFilterSchema } from "./types";
import { createSkillsFilter } from "./lib/create-skills-filter";
import { getSource } from "../_lib/get-source";

const schema = z.object({
  filter: skillsFilterSchema.optional().default({}),
});

export type FindSkillsAggregates = {
  actions: number[];
  focus: number[];
  sources: { name: string; id: string }[];
};

type Options = z.input<typeof schema>;

export async function findSkillsAggregates(
  options: Options = {},
): Promise<FindSkillsAggregates> {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const filter = createSkillsFilter(parsed.filter);

    const records: SkillWithRelations[] = [];

    // Aggregations
    const actionValues = await db
      .selectDistinct({ actions: skills.actions })
      .from(skills)
      .where(and(isNotNull(skills.actions), filter))
      .orderBy(asc(skills.actions));

    let focusValues = await db
      .selectDistinct({ focus: skills.focus })
      .from(skills)
      .where(and(isNotNull(skills.focus), filter))
      .orderBy(asc(skills.focus));

    const sourceIds = await db
      .select({ sourceId: skills.sourceId, sourceType: skills.sourceType })
      .from(skills)
      .where(and(isNotNull(skills.sourceId), filter))
      .groupBy(skills.sourceId, skills.sourceType)
      .orderBy(desc(skills.sourceType));

    const sources: { name: string; id: string }[] = [];
    for (const record of sourceIds) {
      if (!record.sourceId || !record.sourceType) continue;
      const source = await getSource({
        sourceType: record.sourceType as SourceType,
        sourceId: record.sourceId,
      });

      if (source) {
        let name = source.name;
        if ("category" in source) {
          const catPrefix = source.categoryPrefix
            ? source.categoryPrefix + " "
            : "";
          name = `Aspect of ${catPrefix}${source.category}: ${source.name}`;
        } else if (record.sourceType === "domain") {
          name = `${source.name} domain`;
        }
        sources.push({ name: name, id: source.id });
      }
    }

    return {
      actions: actionValues.map((value) => value.actions),
      // Should not need to cast this as the query filters non null vals
      focus: focusValues.map((value) => value.focus) as number[],
      sources,
    };
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
