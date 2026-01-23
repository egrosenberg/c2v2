import { keeperClasses } from "@db/tables/keeper-classes";
import type { PgColumn } from "node_modules/drizzle-orm/pg-core/index.d/";
import z from "zod";
import type { FilterColumn } from "../index.js";

export const keeperClassesFields = ["id", "name", "canAlways"] as const;

export type KeeperClassesField = (typeof keeperClassesFields)[number];

export const keeperClassesFieldsMap: Record<KeeperClassesField, FilterColumn> =
  {
    id: { column: keeperClasses.id },
    name: { column: keeperClasses.name },
    canAlways: { column: keeperClasses.canAlways, operator: "array_contains" },
  };

export const keeperClassesFilterSchema = z.partialRecord(
  z.custom<KeeperClassesField>(),
  z.unknown(),
);

export type KeeperClassesFilter = z.input<typeof keeperClassesFilterSchema>;
