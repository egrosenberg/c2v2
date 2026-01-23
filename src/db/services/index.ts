import type { PgColumn } from "node_modules/drizzle-orm/pg-core/index.d/";

export type PaginatedResult<T> = {
  records: T[];
  total: number;
};

export type FilterOperator = "eq" | "ilike" | "contains";

export type FilterColumn = { column: PgColumn; operator?: FilterOperator };
