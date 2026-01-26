import type { NewAspect } from "@db/tables/aspects";
import { readJson } from "../lib/read-json";
import { findAspects } from "@db/services/aspects/find-aspects";
import { updateAspect } from "@db/services/aspects/update-aspect";
import { createAspect } from "@db/services/aspects/create-aspect";
const NAME = "aspects";

export default async function seedAspects() {
  const data: NewAspect[] = await readJson(NAME);

  for (const aspect of data) {
    const { records } = await findAspects({
      filter: { name: aspect.name },
    });
    if (records.length && records[0]) {
      await updateAspect({
        id: records[0]?.id,
        category: aspect.category ?? undefined,
        categoryPrefix: aspect.categoryPrefix ?? undefined,
        description: aspect.description ?? undefined,
      });
      continue;
    }
    await createAspect(aspect);
  }
}
