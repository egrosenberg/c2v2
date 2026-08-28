import type { Aspect } from "@db/tables/aspects";

export function formatAspectName(aspect: Aspect | null | undefined) {
  if (!aspect) return "";
  return `Apsect of ${aspect?.categoryPrefix ? aspect?.categoryPrefix + " " : ""}${aspect.category}: ${aspect.name}`;
}
