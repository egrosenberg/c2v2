import z, { uuid } from "zod";
import { database } from "../../index.js";
import {  asc, desc} from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import type { PaginatedResult } from "../types.js";
import { skills, type SkillWithRelations } from "@db/tables/skills";
import {
  skillsFieldsMap,
  skillsFilterSchema,
  type SkillsField,
} from "./types.js";
import { createSkillsFilter } from "./lib/create-skills-filter.js";
import { getSkillSource } from "./lib/get-skill-source.js";

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
        ? asc(skillsFieldsMap[parsed.orderBy])
        : desc(skillsFieldsMap[parsed.orderBy]);

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
      const source = await getSkillSource(record);
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
