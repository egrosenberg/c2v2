import type { ServiceMetaFn, ServiceResult } from "..";
import type { findAspects } from "@db/services/aspects/find-aspects";
import type { getAspect } from "@db/services/aspects/get-aspect";

const route = "/api/aspects";

export const svcGetAspect: ServiceMetaFn<typeof getAspect> = () => ({
  method: "GET",
  route,
  name: "get-aspect",
});

export type FindAspects = ServiceResult<typeof findAspects>;
export const svcFindAspects: ServiceMetaFn<typeof findAspects> = () => ({
  method: "GET",
  route,
  name: "find-aspects",
});
