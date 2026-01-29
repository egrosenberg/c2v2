import type { PropsWithChildren } from "react";
import { Box, Flex } from "styled-system/jsx";

export function MainContentWrapper({ children }: PropsWithChildren<{}>) {
  return (
    <Flex flexDir="column" h="full" alignItems="center" w="full" p="md">
      <Box w="full" maxWidth="77rem" h="full">
        {children}
      </Box>
    </Flex>
  );
}
