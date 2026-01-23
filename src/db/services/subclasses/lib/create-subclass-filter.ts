import { and, eq } from "node_modules/drizzle-orm/index.d/";
import {
  subclassesFields,
  subclassesFieldsMap,
  subclassesFilterSchema,
  type SubclassesFilter,
} from "../types.js";
import { createFilterComparison } from "@db/services/_lib/create-filter-comparison";

export function createSubclassFilter(options: SubclassesFilter) {
  const parsed = subclassesFilterSchema.parse(options);

  const filterParts = [];
  for (const key of subclassesFields) {
    if (key in parsed) {
      const comparison = createFilterComparison({
        ...subclassesFieldsMap[key],
        value: parsed[key],
      });
      filterParts.push(comparison);
    }
  }

  return and(...filterParts);
}
