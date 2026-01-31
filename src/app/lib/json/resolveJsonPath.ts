export function resolveJsonPath(
  path: string,
  obj: unknown = self,
  separator = ".",
) {
  var properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev?.[curr], obj);
}
