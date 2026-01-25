"use client";

import { Flex } from "styled-system/jsx";
import { useGetSession } from "./hooks/useGetSession";
import { useService } from "@/api";
import { svcTest } from "./api/test";

export default function Page() {
  const session = useGetSession();
  const { data } = useService(
    svcTest,
    {
      options: { email: session?.user?.email },
    },
    [session?.user?.email],
  );
  return (
    <Flex flexDir="column" alignItems="center" justifyContent="center" h="full">
      {JSON.stringify(data)}
    </Flex>
  );
}
