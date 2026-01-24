import z, { uuid } from "zod";
import { database } from "../../index";
import { asc, desc } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import type { PaginatedResult, SourceType } from "../index";
import { skills, type SkillWithRelations } from "@db/tables/skills";
import { skillsFieldsMap, skillsFilterSchema, type SkillsField } from "./types";
import { createSkillsFilter } from "./lib/create-skills-filter";
import { getSource } from "../_lib/get-source";

const schema = z.object({
  filter: skillsFilterSchema.optional().default({}),
  limit: z.number().optional(),
  offset: z.int().optional().default(0),
  orderBy: z.custom<SkillsField>().optional().default("name"),
  order: z
    .union([z.literal("asc"), z.literal("desc")])
    .optional()
    .default("asc"),
});

type Options = z.input<typeof schema>;

export async function findSkills(
  options: Options = {},
): Promise<PaginatedResult<SkillWithRelations>> {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const order =
      parsed.order === "asc"
        ? asc(skillsFieldsMap[parsed.orderBy].column)
        : desc(skillsFieldsMap[parsed.orderBy].column);

    const filter = createSkillsFilter(parsed.filter);

    const query = db
      .select()
      .from(skills)
      .where(filter)
      .orderBy(order)
      .$dynamic();

    const total = await db.$count(query);

    if (parsed.limit) {
      query.limit(parsed.limit).offset(parsed.offset * parsed.limit);
    }

    const result = await query;

    const records: SkillWithRelations[] = [];

    for (const record of result) {
      const source = await getSource({
        sourceType: record.sourceType as SourceType,
        sourceId: record.sourceId,
      });
      records.push({ ...record, source });
    }

    return {
      records,
      total,
    };
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
