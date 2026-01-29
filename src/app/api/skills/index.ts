import { getSkill } from "@db/services/skills/get-skill";
import type { ServiceMetaFn } from "..";
import { findSkills } from "@db/services/skills/find-skills";

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
