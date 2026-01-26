import type { NewAspect } from "@db/tables/aspects";
import { readJson } from "../lib/read-json";
import { findAspects } from "@db/services/aspects/find-aspects";
import { updateAspect } from "@db/services/aspects/update-aspect";
import { createAspect } from "@db/services/aspects/create-aspect";
import type { NewSkill } from "@db/tables/skills";
import { findSkills } from "@db/services/skills/find-skills";
import { createSkill } from "@db/services/skills/create-skill";
import { updateSkill } from "@db/services/skills/update-skill";
const NAME = "skills";

export default async function seedSkills() {
  const data: NewSkill[] = await readJson(NAME);

  for (const skill of data) {
    const { records } = await findSkills({
      filter: { name: skill.name },
    });
    if (records.length && records[0]) {
      await updateSkill({
        id: records[0]?.id,
        type: skill.type,
        subtype: skill.subtype,
        actions: skill.actions,
        focus: skill.focus,
        range: skill.range,
        numTargets: skill.numTargets,
        targetType: skill.targetType,
        aoeShape: skill.aoeShape,
        aoeRadius: skill.aoeRadius,
        aoeHeight: skill.aoeHeight,
        aoeLength: skill.aoeLength,
        aoeWidth: skill.aoeWidth,
        sourceType: skill.sourceType,
        description: skill.description,
        damageTypes: skill.damageTypes,
        statuses: skill.statuses,
        restoreTypes: skill.restoreTypes,
        tags: skill.tags,
      });
      continue;
    }
    await createSkill(skill);
  }
}
