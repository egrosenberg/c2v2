import { readJson } from "../lib/read-json";
import type { NewKeeperClass } from "@db/tables/keeper-classes";
import { findKeeperClasses } from "@db/services/keeper-classes/find-keeper-classes";
import { updateKeeperClass } from "@db/services/keeper-classes/update-keeper-class";
import { createKeeperClass } from "@db/services/keeper-classes/create-keeper-class";
const NAME = "keeper-classes";

export default async function seedKeeperClasses() {
  const data: NewKeeperClass[] = await readJson(NAME);

  for (const keeperClass of data) {
    const { records } = await findKeeperClasses({
      filter: { name: keeperClass.name },
    });
    if (records.length && records[0]) {
      await updateKeeperClass({
        id: records[0]?.id,
        canAlways: keeperClass.canAlways ?? undefined,
      });
      continue;
    }
    await createKeeperClass(keeperClass);
  }
}
