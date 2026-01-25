import { NextRequest } from "next/server";

export function encodeHookOptions(options: unknown): string {
  return btoa(JSON.stringify(options));
}

export function decodeHookOptions(options: string): unknown {
  return JSON.parse(atob(options));
}

export async function getRouteParams(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get("name");
  const type = request.method;
  let options;

  console.log({ name, options: searchParams.get("options"), type });

  if (type === "POST") {
    try {
      const json = await request.json();
      options = json.options;
    } catch {}
  } else {
    const optionsStr = searchParams.get("options");
    if (optionsStr) options = decodeHookOptions(optionsStr);
  }

  return { name, options };
}
