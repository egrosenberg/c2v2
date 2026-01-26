import { findSubclasses } from "@db/services/subclasses/find-subclasses";
import { readJson } from "../lib/read-json";
import type { NewSubclass } from "@db/tables/subclasses";
import { createSubclass } from "@db/services/subclasses/create-subclass";
const NAME = "subclasses";

export default async function seedSubclasses() {
  const data: NewSubclass[] = await readJson(NAME);

  for (const subclass of data) {
    const { records } = await findSubclasses({
      filter: { name: subclass.name },
    });
    if (records.length) {
      continue;
    }
    await createSubclass(subclass);
  }
}
