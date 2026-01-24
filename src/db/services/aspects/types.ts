import z from "zod";
import type { FilterColumn } from "../index";
import { aspects } from "@db/tables/aspects";

export const aspectsFields = [
  "id",
  "name",
  "category",
  "categoryPrefix",
  "sourceType",
  "sourceId",
  "description",
] as const;

export type AspectsField = (typeof aspectsFields)[number];

export const aspectsFieldsMap: Record<AspectsField, FilterColumn> = {
  id: { column: aspects.id },
  name: { column: aspects.name },
  category: { column: aspects.category },
  categoryPrefix: { column: aspects.categoryPrefix },
  sourceType: { column: aspects.sourceType },
  sourceId: { column: aspects.sourceId },
  description: { column: aspects.description, operator: "substr" },
};

export const aspectsFilterSchema = z.partialRecord(
  z.custom<AspectsField>(),
  z.unknown(),
);

export type AspectsFilter = z.input<typeof aspectsFilterSchema>;
