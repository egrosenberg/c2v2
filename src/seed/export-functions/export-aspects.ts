import { findAspects } from "@db/services/aspects/find-aspects";
import { writeFile } from "fs";
const NAME = "aspects";

export default async function exportAspects() {
  const { records } = await findAspects();
  const outpath = `./src/seed/output/${NAME}.json`;
  await new Promise((resolve) =>
    writeFile(outpath, JSON.stringify(records, undefined, 2), () =>
      resolve(true),
    ),
  );
}
