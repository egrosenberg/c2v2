import { findSubclasses } from "@db/services/subclasses/find-subclasses";
import { writeFile } from "fs";
const NAME = "subclasses";

export default async function exportSubclassess() {
  const { records } = await findSubclasses();
  const outpath = `./src/seed/output/${NAME}.json`;
  await new Promise((resolve) =>
    writeFile(outpath, JSON.stringify(records, undefined, 2), () =>
      resolve(true),
    ),
  );
}
