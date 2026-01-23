import { and, eq } from "node_modules/drizzle-orm/index.d/";
import {
  subclassesFields,
  subclassesFieldsMap,
  subclassesFilterSchema,
  type SubclassesFilter,
} from "../types.js";

export function createSubclassFilter(options: SubclassesFilter) {
  const parsed = subclassesFilterSchema.parse(options);

  const filterParts = [];
  for (const key of subclassesFields) {
    if (key in parsed) {
      filterParts.push(eq(subclassesFieldsMap[key], parsed[key]));
    }
  }

  return and(...filterParts);
}
