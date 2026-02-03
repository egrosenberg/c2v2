import { NextRequest } from "next/server";
import { getRouteParams } from "../options-transforms";
import { getSkill } from "@db/services/skills/get-skill";
import { findSkills } from "@db/services/skills/find-skills";
import { updateSkill } from "@db/services/skills/update-skill";

export async function GET(request: NextRequest) {
  try {
    const { name, options } = await getRouteParams(request);

    switch (name) {
      case "get-skill": {
        const data = await getSkill(options);
        return Response.json({ data });
      }
      case "find-skills": {
        const data = await findSkills(options);
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
    const { name, options } = await getRouteParams(request);

    switch (name) {
      case "update-skill": {
        const data = await updateSkill(options);
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
