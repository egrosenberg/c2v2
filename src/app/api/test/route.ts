import { NextRequest } from "next/server";
import { getRouteParams } from "../options-transforms";

export async function GET(request: NextRequest) {
  try {
    const { name, options } = await getRouteParams(request);

    switch (name) {
      case "test":
        return Response.json({ data: options });
      default:
        throw new Error(`Unknown route: '${name}'`);
    }
  } catch (e) {
    const error = e as Error;
    return Response.json({ error: error.message }, { status: 400 });
  }
}
