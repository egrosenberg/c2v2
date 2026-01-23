import { and, eq } from "node_modules/drizzle-orm/index.d/";
import {
  skillsFields,
  skillsFieldsMap,
  skillsFilterSchema,
  type skillsFilter,
} from "../types.js";

export function createSkillsFilter(options: skillsFilter) {
  const parsed = skillsFilterSchema.parse(options);

  const filterParts = [];
  for (const key of skillsFields) {
    if (key in parsed) {
      filterParts.push(eq(skillsFieldsMap[key], parsed[key]));
    }
  }

  return and(...filterParts);
}
