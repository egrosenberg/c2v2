import { subclasses } from "@db/tables/subclasses";
import type { PgColumn } from "node_modules/drizzle-orm/pg-core/index.d/";
import z from "zod";
import type { FilterColumn } from "../index.js";
import { keeperClasses } from "@db/tables/keeper-classes";
import { domains } from "@db/tables/domains";

export const subclassesFields = [
  "id",
  "name",
  "domainId",
  "classId",
  "class.name",
  "domain.name",
] as const;

export type SubclassesField = (typeof subclassesFields)[number];

export const subclassesFieldsMap: Record<SubclassesField, FilterColumn> = {
  id: { column: subclasses.id },
  name: { column: subclasses.name },
  domainId: { column: subclasses.domainId },
  classId: { column: subclasses.classId },
  "class.name": { column: keeperClasses.name, operator: "ilike" },
  "domain.name": { column: domains.name, operator: "ilike" },
} as const;

export const subclassesFilterSchema = z.partialRecord(
  z.custom<SubclassesField>(),
  z.unknown(),
);
export type SubclassesFilter = z.input<typeof subclassesFilterSchema>;
