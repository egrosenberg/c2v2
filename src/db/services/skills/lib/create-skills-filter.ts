import { and, eq } from "drizzle-orm";
import {
  skillsFields,
  skillsFieldsMap,
  skillsFilterSchema,
  type SkillsFilter,
} from "../types";
import { createFilterComparison } from "@db/services/_lib/create-filter-comparison";

export function createSkillsFilter(options: SkillsFilter) {
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
