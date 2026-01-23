import { and, eq } from "node_modules/drizzle-orm/index.d/";
import {
  aspectsFields,
  aspectsFieldsMap,
  aspectsFilterSchema,
  type AspectsFilter,
} from "../types.js";
import { createFilterComparison } from "@db/services/_lib/create-filter-comparison";

export function createAspectsFilter(options: AspectsFilter) {
  const parsed = aspectsFilterSchema.parse(options);

  const filterParts = [];
  for (const key of aspectsFields) {
    if (key in parsed) {
      const comparison = createFilterComparison({
        ...aspectsFieldsMap[key],
        value: parsed[key],
      });
      filterParts.push(comparison);
    }
  }

  return and(...filterParts);
}
