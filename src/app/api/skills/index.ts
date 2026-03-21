import { getSkill } from "@db/services/skills/get-skill";
import type { ServiceArguments, ServiceMetaFn } from "..";
import { findSkills } from "@db/services/skills/find-skills";
import type { updateSkill } from "@db/services/skills/update-skill";

const route = "/api/skills";

export const svcGetSkill: ServiceMetaFn<typeof getSkill> = () => ({
  method: "GET",
  route,
  name: "get-skill",
});

export const svcFindSkills: ServiceMetaFn<typeof findSkills> = () => ({
  method: "GET",
  route,
  name: "find-skills",
});

export type UpdateSkillOptions = ServiceArguments<typeof updateSkill>;
export const svcUpdateSkill: ServiceMetaFn<typeof updateSkill> = () => ({
  method: "POST",
  route,
  name: "update-skill",
});
