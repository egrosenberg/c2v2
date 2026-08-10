import { findKeeperClasses } from "@db/services/keeper-classes/find-keeper-classes";
import { writeFile } from "fs";
const NAME = "keeper-classes";

export default async function exportKeeperClasses() {
  const { records } = await findKeeperClasses();
  const outpath = `./src/seed/output/${NAME}.json`;
  await new Promise((resolve) =>
    writeFile(outpath, JSON.stringify(records, undefined, 2), () =>
      resolve(true),
    ),
  );
}
