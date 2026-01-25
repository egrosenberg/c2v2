"use client";

import { Flex } from "styled-system/jsx";
import { useGetSession } from "./hooks/useGetSession";

export default function Page() {
  const session = useGetSession();
  return (
    <Flex flexDir="column" alignItems="center" justifyContent="center" h="full">
      {JSON.stringify(session)}
    </Flex>
  );
}
