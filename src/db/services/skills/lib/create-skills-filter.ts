import { and, eq } from "node_modules/drizzle-orm/index.d/";
import {
  skillsFields,
  skillsFieldsMap,
  skillsFilterSchema,
  type skillsFilter,
} from "../types.js";
import { createFilterComparison } from "@db/services/_lib/create-filter-comparison";

export function createSkillsFilter(options: skillsFilter) {
  const parsed = skillsFilterSchema.parse(options);

  const filterParts = [];
  for (const key of skillsFields) {
    if (key in parsed) {
      const comparison = createFilterComparison({
        ...skillsFieldsMap[key],
        value: parsed[key],
      });
      filterParts.push(comparison);
    }
  }

  return and(...filterParts);
}
