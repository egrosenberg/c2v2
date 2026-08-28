import type { Aspect } from "@db/tables/aspects";
import type { SkillWithRelations } from "@db/tables/skills";
import { formatAspectName } from "./formatAspectName";

export function formatSource(skill: SkillWithRelations | undefined) {
  if (!skill?.source) return;
  if (skill.sourceType === "aspect") {
    const source = skill.source as Aspect;
    return formatAspectName(source);
  }
  if (skill.sourceType === "domain") {
    return `${skill.source.name} Domain`;
  }
  if (skill.sourceType === "class") {
    return `${skill.source.name} Class`;
  }
  return skill.source.name;
}
