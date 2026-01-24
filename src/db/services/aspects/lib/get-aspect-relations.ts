import { database } from "@db/index";
import { getSource } from "@db/services/_lib/get-source";
import type { SourceType } from "@db/services/index";
import type { Aspect, AspectWithRelations } from "@db/tables/aspects";
import { skills } from "@db/tables/skills";
import { eq } from "drizzle-orm";

export async function getAspectRelations(
  aspect: Aspect,
): Promise<AspectWithRelations> {
  const db = database();

  const source = await getSource({
    sourceType: aspect.sourceType as SourceType,
    sourceId: aspect.sourceId,
  });

  const grantedSkills = await db
    .select()
    .from(skills)
    .where(eq(skills.sourceId, aspect.id));

  return { ...aspect, source, skills: grantedSkills };
}
