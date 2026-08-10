import { findSkills } from "@db/services/skills/find-skills";
import { writeFile } from "fs";
const NAME = "skills";

export default async function exportSkills() {
  const { records } = await findSkills();
  const outpath = `./src/seed/output/${NAME}.json`;
  await new Promise((resolve) =>
    writeFile(outpath, JSON.stringify(records, undefined, 2), () =>
      resolve(true),
    ),
  );
}
