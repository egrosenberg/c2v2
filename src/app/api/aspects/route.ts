import { NextRequest } from "next/server";
import { getRouteParams } from "../options-transforms";
import { getAspect } from "@db/services/aspects/get-aspect";
import { findAspects } from "@db/services/aspects/find-aspects";

export async function GET(request: NextRequest) {
  try {
    const { name, options } = await getRouteParams(request);

    switch (name) {
      case "get-aspect": {
        const data = await getAspect(options);
        return Response.json({ data });
      }
      case "find-aspects": {
        const data = await findAspects(options);
        return Response.json({ data });
      }
      default:
        throw new Error(`Unknown route: '${name}'`);
    }
  } catch (e) {
    const error = e as Error;
    return Response.json({ error: error.message }, { status: 400 });
  }
}
