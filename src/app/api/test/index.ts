import { ServiceMetaFn } from "..";

export const svcTest: ServiceMetaFn<
  (options: { email: string }) => string
> = () => ({
  method: "GET",
  route: "api/test",
  name: "test",
});
