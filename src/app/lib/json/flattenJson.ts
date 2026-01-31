export function flattenJson(
  object: unknown,
  maxDepth: number = 3,
  res: Record<string, unknown> = {},
  rootPath: string = "",
) {
  if (maxDepth < 1) return undefined;

  if (!(object && typeof object === "object")) return undefined;

  for (const [key, value] of Object.entries(object)) {
    const path = rootPath ? `${rootPath}.${key}` : key;
    if (typeof value === "object") {
      flattenJson(value, maxDepth - 1, res, path);
    } else {
      res[path] = value;
    }
  }
  return res;
}
