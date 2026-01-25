"use client";

import { Flex } from "styled-system/jsx";
import { useService } from "./api";
import { svcTest } from "./api/test";

export default function Page() {
  const { data, service } = useService(svcTest, {
    hookOptions: { str: "Return this!" },
  });

  return (
    <Flex flexDir="column" alignItems="center" justifyContent="center" h="full">
      {/* <Input label="Hello, input!" /> */}
      <p>Data: `{JSON.stringify(data)}`</p>
      <button onClick={() => service({ str: "test" })}>Pres for query</button>
    </Flex>
  );
}
