import z from "zod";
import { database } from "../../index";

import { fromZodError } from "zod-validation-error";
import { searchIndex } from "@db/tables/search-index";
import { users } from "@db/tables/users";
import { getUser } from "./get-user";

const schema = z.object({
  email: z.string(),
});

type Options = z.input<typeof schema>;

export async function createUser(options: Options) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    // Return user if it exists already
    const existingUser = await getUser({ email: parsed.email });
    if (existingUser) return existingUser;

    const [record] = await db
      .insert(users)
      .values(parsed)
      .onConflictDoNothing()
      .returning();

    if (!record) throw new Error("Failed to create domain");

    await db.insert(searchIndex).values({ subclass: record.id });

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
