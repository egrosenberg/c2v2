import { getDomain } from "@db/services/domains/get-domain";
import { getKeeperClass } from "@db/services/keeper-classes/get-keeper-class";
import { getSubclass } from "@db/services/subclasses/get-subclass";
import type { Skill, SkillSource, SkillSourceType } from "@db/tables/skills";

export async function getSkillSource(skill: Skill): Promise<SkillSource> {
  if (!(skill.sourceType && skill.sourceId)) return;
  switch (skill.sourceType as SkillSourceType) {
    case "class":
      return getKeeperClass({ id: skill.sourceId });
    case "subclass":
      return getSubclass({ id: skill.sourceId });
    case "aspect":
      return undefined;
    case "domain":
      return getDomain({ id: skill.sourceId });
    default:
      return undefined;
  }
}
