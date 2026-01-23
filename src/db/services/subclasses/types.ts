import { subclasses } from "@db/tables/subclasses";
import type { PgColumn } from "node_modules/drizzle-orm/pg-core/index.d/";
import z from "zod";

export const subclassesFields = ["id", "name", "domainId", "classId"] as const;

export type SubclassesField = (typeof subclassesFields)[number];

export const subclassesFieldsMap: Record<SubclassesField, PgColumn> = {
  id: subclasses.id,
  name: subclasses.name,
  domainId: subclasses.domainId,
  classId: subclasses.classId,
} as const;

export const subclassesFilterSchema = z.partialRecord(
  z.custom<SubclassesField>(),
  z.unknown(),
);
export type SubclassesFilter = z.input<typeof subclassesFilterSchema>;
