import { ServiceMetaFn } from "..";

export const svcTest: ServiceMetaFn<
  (options: { str: string }) => string
> = () => ({
  name: "test",
  route: "api/test",
  type: "GET",
});
