import { Box, Flex } from "styled-system/jsx";
import { cerberus } from "styled-system/jsx/factory";
import { Input } from "../components/Input/input";

export default function Page() {
  return (
    <Flex flexDir="column" alignItems="center" justifyContent="center" h="full">
      <Input label="Hello, input!" />
    </Flex>
  );
}
