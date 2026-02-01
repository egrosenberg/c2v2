import { NextRequest } from "next/server";
import { getRouteParams } from "../options-transforms";
import { getLogToRoles } from "@db/services/logto/get-logto-roles";

export async function GET(request: NextRequest) {
  try {
    const { name, options } = await getRouteParams(request);

    switch (name) {
      case "get-logto-roles": {
        const data = await getLogToRoles(options);
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
