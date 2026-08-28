import { MaybeHTML } from "@/components/html/MaybeHTML/MaybeHTML";
import { Text } from "@cerberus/react";
import type { Ref } from "react";
import { Box, Flex, HStack, VStack } from "styled-system/jsx";
import { domainIconMap } from "@/components/SVG/domains/types";
import type { AspectWithRelations } from "@db/tables/aspects";
import type { SubclassWithRelations } from "@db/tables/subclasses";
import { cardHeightPx, cardWidthPx } from "../../types";
import { formatAspectName } from "@/lib/string/formatAspectName";

export type AspectCardProps = {
  aspect: AspectWithRelations | undefined | null;
  ref?: Ref<HTMLDivElement>;
};

export default function AspectCard({ aspect, ref }: AspectCardProps) {
  let domain: string | undefined;

  if (aspect?.sourceType === "domain") {
    domain = aspect.source?.name;
  } else if (aspect?.sourceType === "subclass") {
    domain = (aspect.source as SubclassWithRelations).domain.name;
  }

  const Icon = domainIconMap[domain as keyof typeof domainIconMap];

  return (
    <Flex
      w={cardWidthPx}
      h={cardHeightPx}
      flexDir="column"
      justifyContent="space-between"
      border="1px solid"
      ref={ref}
      color="black"
      bgColor="white"
    >
      <HStack
        justifyContent="space-between"
        py="xl"
        px="md"
        pl="lg"
        alignItems="flex-start"
      >
        <HStack w="max-content" gap="lg" pr="md">
          <VStack alignItems="flex-start" gap="xs">
            <Text
              fontSize="3.5rem"
              lineHeight="1.15"
              fontVariantCaps="small-caps"
            >
              {formatAspectName(aspect)}
            </Text>
          </VStack>
        </HStack>
        {Icon && <Icon size={120} color="black" />}
      </HStack>
      <VStack gap="md">
        <Box borderTop="5px solid" borderTopColor="page.border.100" w="80%" />
        <MaybeHTML
          maybeHtml={aspect?.description ?? ""}
          fontSize="2.5rem"
          lineHeight="1.25"
          px="xl"
          w="full"
          css={{ "& br": { mb: "lg" }, "& p": { fontSize: "2.5rem" } }}
        />
        {aspect?.skills.map((skill, i) => (
          <Text key={i} fontSize="2.5rem" lineHeight="1.25">
            Grants skill: <strong>{skill.name}</strong>
          </Text>
        ))}
        <Text fontSize="1.5rem" p="sm" w="full">
          CELESTUS - VP.4.7.0{" "}
        </Text>
      </VStack>
    </Flex>
  );
}
