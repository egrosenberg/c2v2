import { PgColumn } from "node_modules/drizzle-orm/pg-core/index.d/";
import z from "zod";
import type { FilterOperator } from "../index.js";
import { eq, ilike, sql } from "node_modules/drizzle-orm/index.d/";

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
      return eq(parsed.column, parsed.value);
    case "ilike":
      return ilike(parsed.column, String(parsed.value));
    case "array_contains":
      // Not super happy with this but this is the best I've got for now
      // There is a real argument for just not using array columns ever
      return sql`position(${parsed.value} in concat_ws(',', ${parsed.column}))>0`;
    case "substr":
      return sql`position(${parsed.value} in ${parsed.column})>0`;
  }
}
