export function sentenceCase(str?: string) {
  if (!str) return "";
  return str.at(0)?.toUpperCase() + str.slice(1).toLowerCase();
}
