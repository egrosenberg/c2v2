import type { NewDomain } from "@db/tables/domains";
import { readJson } from "../lib/read-json";
import { findDomains } from "@db/services/domains/find-domains";
import { createDomain } from "@db/services/domains/create-domain";
const NAME = "domains";

export default async function seedDomains() {
  const data: NewDomain[] = await readJson(NAME);

  for (const domain of data) {
    const { records } = await findDomains({
      filter: { name: domain.name },
    });
    if (records.length) continue;
    await createDomain(domain);
  }
}
