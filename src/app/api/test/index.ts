import { ServiceMetaFn } from "..";

export const svcTest: ServiceMetaFn<
  (options: { email: string }) => string
> = () => ({
  name: "test",
  route: "api/test",
  type: "GET",
});
