import { getLogToRoles } from "@db/services/logto/get-logto-roles";
import { auth } from "@/auth";

export async function authenticateAdmin() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("No authenticated user");

  const roles = await getLogToRoles({ email: session.user.email });

  const isAdmin = roles.some((r) => r.name === "admin");
  if (!isAdmin) throw new Error("User lacks authentication");

  return session;
}
