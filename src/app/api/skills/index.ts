import { getSkill } from "@db/services/skills/get-skill";
import type { ServiceArguments, ServiceMetaFn, ServiceResult } from "..";
import { findSkills } from "@db/services/skills/find-skills";
import type { updateSkill } from "@db/services/skills/update-skill";
import type { findSkillsAggregates } from "@db/services/skills/find-skills-aggregates";

const route = "/api/skills";

export const svcGetSkill: ServiceMetaFn<typeof getSkill> = () => ({
  method: "GET",
  route,
  name: "get-skill",
});

export type FindSkills = ServiceResult<typeof findSkills>;
export const svcFindSkills: ServiceMetaFn<typeof findSkills> = () => ({
  method: "GET",
  route,
  name: "find-skills",
});

export const svcFindSkillsAggregates: ServiceMetaFn<
  typeof findSkillsAggregates
> = () => ({
  method: "GET",
  route,
  name: "find-skills-aggregates",
});

export type UpdateSkillOptions = ServiceArguments<typeof updateSkill>;
export const svcUpdateSkill: ServiceMetaFn<typeof updateSkill> = () => ({
  method: "POST",
  route,
  name: "update-skill",
});
