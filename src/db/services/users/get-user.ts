import z, { email } from "zod";
import { database } from "../../index";
import { and, eq, ilike } from "drizzle-orm";
import { fromZodError } from "zod-validation-error";
import { subclasses } from "@db/tables/subclasses";
import { domains } from "@db/tables/domains";
import { keeperClasses } from "@db/tables/keeper-classes";
import { users } from "@db/tables/users";

const schema = z
  .object({
    id: z.uuid(),
    email: z.never().optional(),
  })
  .or(
    z.object({
      id: z.never().optional(),
      email: z.string(),
    }),
  );

type Options = z.input<typeof schema>;

export async function getUser(options: Options) {
  try {
    const parsed = schema.parse(options);

    const db = database();

    const idFilter = parsed.id ? eq(users.id, parsed.id) : undefined;
    const emailFilter = parsed.email
      ? eq(users.email, parsed.email)
      : undefined;

    const filter = and(idFilter, emailFilter);

    const [record] = await db.select().from(users).where(filter).limit(1);

    if (!record) return null;

    return record;
  } catch (error) {
    if (error instanceof z.ZodError) throw fromZodError(error);
    throw error;
  }
}
