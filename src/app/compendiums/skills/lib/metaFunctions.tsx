import { CardMeta } from "@/components/meta/CardMeta";
import type { Skill, SkillWithRelations } from "@db/tables/skills";

export function getSkillPageTitle(skill?: Skill | SkillWithRelations) {
  if (!skill) return "Celestus | Skills";
  return `${skill.name} | Celestus`;
}

export function getSkillPageMeta(skill?: Skill | SkillWithRelations) {
  return (
    <CardMeta
      title={getSkillPageTitle(skill)}
      description={skill?.description ?? undefined}
    />
  );
}
