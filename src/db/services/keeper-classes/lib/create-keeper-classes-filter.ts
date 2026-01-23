import { and, eq } from "node_modules/drizzle-orm/index.d/";
import {
  keeperClassesFields,
  keeperClassesFieldsMap,
  keeperClassesFilterSchema,
  type KeeperClassesFilter,
} from "../types.js";
import { createFilterComparison } from "@db/services/_lib/create-filter-comparison";

export function createKeeperClassesFilter(options: KeeperClassesFilter) {
  const parsed = keeperClassesFilterSchema.parse(options);

  const filterParts = [];
  for (const key of keeperClassesFields) {
    if (key in parsed) {
      const comparison = createFilterComparison({
        ...keeperClassesFieldsMap[key],
        value: parsed[key],
      });
      filterParts.push(comparison);
    }
  }

  return and(...filterParts);
}
