import type { findKeeperClasses } from "@db/services/keeper-classes/find-keeper-classes";
import type { ServiceMetaFn } from "..";
import type { getKeeperClass } from "@db/services/keeper-classes/get-keeper-class";

const route = "/api/keeper-classes";

export const svcGetKeeperClass: ServiceMetaFn<typeof getKeeperClass> = () => ({
  method: "GET",
  route,
  name: "get-keeper-class",
});

export const svcFindKeeperClasses: ServiceMetaFn<
  typeof findKeeperClasses
> = () => ({
  method: "GET",
  route,
  name: "find-keeper-classes",
});
