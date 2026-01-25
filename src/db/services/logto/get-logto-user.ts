import z from "zod";
import { getAccessToken } from "./get-access-token";
import { fromZodError } from "zod-validation-error";
import { LogtoUser } from "./types";

const schema = z.object({
  email: z.string(),
});

type Options = z.input<typeof schema>;

export async function getLogtoUser(options: Options) {
  try {
    const parsed = schema.parse(options);

    const accessToken = await getAccessToken();

    const baseUri = `https://${process.env.LOGTO_TENANT_ID}.logto.app/api/users`;
    const query = `?search.primary_email=%25${parsed.email}%25`;
    const uri = baseUri + query;

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

    const users: LogtoUser[] = await response.json();

    return users[0];
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
