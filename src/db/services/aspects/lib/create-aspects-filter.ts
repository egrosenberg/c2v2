import { and, eq } from "drizzle-orm";
import {
  aspectsFields,
  aspectsFieldsMap,
  aspectsFilterSchema,
  type AspectsFilter,
} from "../types";
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
