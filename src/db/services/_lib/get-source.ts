import { getDomain } from "@db/services/domains/get-domain";
import { getKeeperClass } from "@db/services/keeper-classes/get-keeper-class";
import { getSubclass } from "@db/services/subclasses/get-subclass";
import type { Source, SourceType } from "../index";
import z from "zod";

const schema = z.object({
  sourceType: z.custom<SourceType>().nullable(),
  sourceId: z.uuid().nullable(),
});

type Options = z.input<typeof schema>;

export async function getSource(options: Options): Promise<Source> {
  const parsed = schema.parse(options);

  if (!parsed.sourceId || !parsed.sourceType) return null;

  switch (parsed.sourceType) {
    case "class":
      return getKeeperClass({ id: parsed.sourceId });
    case "subclass":
      return getSubclass({ id: parsed.sourceId });
    case "aspect":
      return null;
    case "domain":
      return getDomain({ id: parsed.sourceId });
    default:
      return null;
  }
}
