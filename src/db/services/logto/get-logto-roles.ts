import z from "zod";
import { getAccessToken } from "./get-access-token";
import { fromZodError } from "zod-validation-error";
import { getLogtoUser } from "./get-logto-user";
import type { LogtoRole } from "./types";

const schema = z.object({
  email: z.string(),
});

type Options = z.input<typeof schema>;

export async function getLogToRoles(options: Options) {
  try {
    const parsed = schema.parse(options);

    const accessToken = await getAccessToken();

    const user = await getLogtoUser(parsed);
    if (!user) return [];

    const uri = `https://${process.env.LOGTO_TENANT_ID}.logto.app/api/users/${user?.id}/roles`;

    const response = await fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Error in searching for logto user: " + (await response.text()),
      );
    }

    const roles = await response.json();

    return roles as LogtoRole[];
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
