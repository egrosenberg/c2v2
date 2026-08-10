import { PgColumn } from "drizzle-orm/pg-core";
import z from "zod";
import type { FilterOperator } from "../index";
import { eq, ilike, inArray, or, SQL, sql } from "drizzle-orm";

const schema = z.object({
  column: z.custom<PgColumn>(),
  value: z.unknown(),
  operator: z.custom<FilterOperator>().optional().default("eq"),
});

type Options = z.input<typeof schema>;

export function createFilterComparison(options: Options) {
  const parsed = schema.parse(options);

  switch (parsed.operator) {
    case "eq":
      if (Array.isArray(parsed.value)) {
        if (parsed.value.length) return inArray(parsed.column, parsed.value);
        else return undefined;
      }
      return eq(parsed.column, parsed.value);
    case "ilike":
      if (Array.isArray(parsed.value)) {
        const ilikeParts: SQL<unknown>[] = [];
        for (const value of parsed.value) {
          ilikeParts.push(ilike(parsed.column, String(value)));
        }
        return or(...ilikeParts);
      }
      return ilike(parsed.column, String(parsed.value));
    case "array_contains":
      // Not super happy with this but this is the best I've got for now
      // There is a real argument for just not using array columns ever
      if (Array.isArray(parsed.value)) {
        const containsParts: SQL<unknown>[] = [];
        for (const value of parsed.value) {
          containsParts.push(
            sql`position(LOWER(${value}) in LOWER(concat_ws(',', ${parsed.column})))>0`,
          );
        }
        return or(...containsParts);
      }
      return sql`position(LOWER(${parsed.value}) in LOWER(concat_ws(',', ${parsed.column})))>0`;
    case "substr":
      if (Array.isArray(parsed.value)) {
        const substrParts: SQL<unknown>[] = [];
        for (const value of parsed.value) {
          console.log(`position(LOWER(${value}) in LOWER(${parsed.column}))>0`);
          substrParts.push(
            sql`position(LOWER(${value}) in LOWER(${parsed.column}))>0`,
          );
        }
        return or(...substrParts);
      }
      return sql`position(LOWER(${parsed.value}) in LOWER(${parsed.column}))>0`;
  }
}
