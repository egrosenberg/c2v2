import { NextRequest } from "next/server";
import { getRouteParams } from "../options-transforms";
import { getKeeperClass } from "@db/services/keeper-classes/get-keeper-class";
import { findKeeperClasses } from "@db/services/keeper-classes/find-keeper-classes";

export async function GET(request: NextRequest) {
  try {
    const { name, options } = await getRouteParams(request);

    switch (name) {
      case "get-keeper-class": {
        const data = await getKeeperClass(options);
        return Response.json({ data });
      }
      case "find-keeper-classes": {
        const data = await findKeeperClasses(options);
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

export async function POST(request: NextRequest) {
  try {
    const { name } = await getRouteParams(request);

    switch (name) {
      default:
        throw new Error(`Unknown route: '${name}'`);
    }
  } catch (e) {
    const error = e as Error;
    return Response.json({ error: error.message }, { status: 400 });
  }
}
