import { skills } from "@db/tables/skills";
import type { PgColumn } from "drizzle-orm/pg-core";
import z from "zod";
import type { FilterColumn } from "../index";

export const skillsFields = [
  "id",
  "name",
  "type",
  "subtype",
  "actions",
  "focus",
  "range",
  "numTargets",
  "targetType",
  "aoeShape",
  "aoeRadius",
  "aoeHeight",
  "aoeLength",
  "aoeWidth",
  "sourceType",
  "sourceId",
  "description",
  "damageTypes",
  "statuses",
  "restoreTypes",
  "tags",
] as const;

export type SkillsField = (typeof skillsFields)[number];

export const skillsFieldsMap: Record<SkillsField, FilterColumn> = {
  id: { column: skills.id },
  name: { column: skills.name, operator: "ilike" },
  type: { column: skills.type, operator: "ilike" },
  subtype: { column: skills.type },
  actions: { column: skills.actions },
  focus: { column: skills.focus },
  range: { column: skills.range },
  numTargets: { column: skills.numTargets },
  targetType: { column: skills.targetType },
  aoeShape: { column: skills.aoeShape },
  aoeRadius: { column: skills.aoeRadius },
  aoeHeight: { column: skills.aoeHeight },
  aoeLength: { column: skills.aoeLength },
  aoeWidth: { column: skills.aoeWidth },
  sourceType: { column: skills.sourceType },
  sourceId: { column: skills.sourceId },
  description: { column: skills.description },
  damageTypes: { column: skills.damageTypes },
  statuses: { column: skills.statuses },
  restoreTypes: { column: skills.restoreTypes },
  tags: { column: skills.tags },
};

export const skillsFilterSchema = z.partialRecord(
  z.custom<SkillsField>(),
  z.unknown(),
);

export type skillsFilter = z.input<typeof skillsFilterSchema>;
