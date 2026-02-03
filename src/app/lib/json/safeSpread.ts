export function safeSpread<O extends Record<string, unknown>>(
  o: O,
): Partial<O> {
  const res = [];
  for (const key of Object.keys(o)) {
    if (o[key] || typeof o[key] === "number") res.push([key, o[key]]);
  }

  return Object.fromEntries(res);
}
