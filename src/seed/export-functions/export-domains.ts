import { findDomains } from "@db/services/domains/find-domains";
import { writeFile } from "fs";
const NAME = "domains";

export default async function exportDomains() {
  const { records } = await findDomains();
  const outpath = `./src/seed/output/${NAME}.json`;
  await new Promise((resolve) =>
    writeFile(outpath, JSON.stringify(records, undefined, 2), () =>
      resolve(true),
    ),
  );
}
