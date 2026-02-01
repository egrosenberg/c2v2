import type { ServiceMetaFn } from "..";
import type { getLogToRoles } from "@db/services/logto/get-logto-roles";

const route = "/api/logto";

export const svcGetLogtoRoles: ServiceMetaFn<typeof getLogToRoles> = () => ({
  method: "GET",
  route,
  name: "get-logto-roles",
});
