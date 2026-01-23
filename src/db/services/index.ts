import type { Aspect } from "@db/tables/aspects";
import type { Domain } from "@db/tables/domains";
import type { KeeperClass } from "@db/tables/keeper-classes";
import type { Subclass } from "@db/tables/subclasses";
import type { PgColumn } from "node_modules/drizzle-orm/pg-core/index.d/";
import z from "zod";

export type PaginatedResult<T> = {
  records: T[];
  total: number;
};

export type FilterOperator = "eq" | "ilike" | "array_contains" | "substr";

export type FilterColumn = { column: PgColumn; operator?: FilterOperator };

const sources = ["class", "aspect", "subclass", "domain"] as const;
export type SourceType = (typeof sources)[number];
export type Source = Aspect | Domain | KeeperClass | Subclass | null;

export const withoutSource = z.object({
  withoutSource: z.boolean().optional(),
});
