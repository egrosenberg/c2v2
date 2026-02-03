import { Box } from "styled-system/jsx";

export function MenuBarDivider() {
  return (
    <Box
      w="0"
      borderLeft="1px solid"
      borderLeftColor="action.border.100"
      mx="sm"
    />
  );
}
