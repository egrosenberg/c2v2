import { skills } from "@db/tables/skills";
import { createUpdateSchema } from "drizzle-zod";
import type { PgColumn } from "node_modules/drizzle-orm/pg-core/index.d/";
import z from "zod";

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

export const skillsFieldsMap: Record<SkillsField, PgColumn> = {
  id: skills.id,
  name: skills.name,
  type: skills.type,
  subtype: skills.type,
  actions: skills.actions,
  focus: skills.focus,
  range: skills.range,
  numTargets: skills.numTargets,
  targetType: skills.targetType,
  aoeShape: skills.aoeShape,
  aoeRadius: skills.aoeRadius,
  aoeHeight: skills.aoeHeight,
  aoeLength: skills.aoeLength,
  aoeWidth: skills.aoeWidth,
  sourceType: skills.sourceType,
  sourceId: skills.sourceId,
  description: skills.description,
  damageTypes: skills.damageTypes,
  statuses: skills.statuses,
  restoreTypes: skills.restoreTypes,
  tags: skills.tags,
};

export const skillsFilterSchema = z.partialRecord(
  z.custom<SkillsField>(),
  z.unknown(),
);

export type skillsFilter = z.input<typeof skillsFilterSchema>;
