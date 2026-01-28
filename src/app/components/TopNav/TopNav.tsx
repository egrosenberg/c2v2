import Link from "next/link";
import { css } from "styled-system/css";
import { hstack } from "styled-system/patterns";
import { Box, HStack } from "styled-system/jsx";
import { CompendiumsMenu } from "./components/CompendiumsMenu";
import { ColorMode } from "./components/ColorMode";

export async function TopNav() {
  return (
    <Box
      w="100vw"
      h="100vh"
      position="fixed"
      p="md"
      top="0"
      left="0"
      pointerEvents="none"
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <nav
        data-placement="top"
        className={hstack({
          pointerEvents: "all",
          bgColor: "page.surface.200",
          border: "1px solid",
          borderColor: "page.border.initial",
          w: "full",
          maxWidth: "77rem",
          px: "md",
          py: "xs",
          rounded: "lg",
          textStyle: "heading-md",
          justifyContent: "space-between",
        })}
      >
        {/* Left */}
        <HStack gap="sm">
          <Link
            className={css({
              textStyle: "heading-sm",
              fontFamily: "uncial",
            })}
            href="/"
          >
            Celestus
          </Link>
          <Box
            borderRight="1px solid"
            borderRightColor="page.border.initial"
            h="auto"
            mx="sm"
            alignSelf="stretch"
          />
          <CompendiumsMenu />
        </HStack>
        <ColorMode />
      </nav>
    </Box>
  );
}
