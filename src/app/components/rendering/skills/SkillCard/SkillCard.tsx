import { MaybeHTML } from "@/components/html/MaybeHTML/MaybeHTML";
import { Text } from "@cerberus/react";
import type { SkillWithRelations } from "@db/tables/skills";
import type { Ref } from "react";
import { Box, Flex, HStack, VStack } from "styled-system/jsx";
import { domainIconMap } from "@/components/SVG/domains/types";
import type { AspectWithRelations } from "@db/tables/aspects";
import type { SubclassWithRelations } from "@db/tables/subclasses";
import { cardHeightPx, cardWidthPx } from "../../types";

export type SkillCardProps = {
  skill: SkillWithRelations | undefined | null;
  ref?: Ref<HTMLDivElement>;
};

export default function SkillCard({ skill, ref }: SkillCardProps) {
  let domain: string | undefined;

  if (skill?.sourceType === "domain") {
    domain = skill.source?.name;
  } else if (skill?.sourceType === "aspect") {
    const aspect = skill.source as AspectWithRelations;
    if (aspect.sourceType === "domain") {
      domain = aspect.source?.name;
    } else if (aspect.sourceType === "subclass") {
      domain = (aspect.source as SubclassWithRelations).domain.name;
    }
  } else if (skill?.sourceType === "subclass") {
    domain = (skill.source as SubclassWithRelations).domain.name;
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
              {skill?.name}
            </Text>
            <Text fontSize="2.25rem" fontVariantCaps="small-caps">
              {skill?.type} Skill{" "}
              {skill?.subtype && `- ${skill?.subtype.replace(",", ", ")}`}
            </Text>
            <VStack
              alignItems="flex-start"
              justifyContent="flex-start"
              fontSize="2rem"
              gap="xs"
              h="full"
              w="max-content"
              mt="md"
              pl="md"
              borderLeftColor="page.border.100"
              borderLeft="3px solid"
            >
              <Text whiteSpace="nowrap">
                <em>
                  {skill?.actions} Actions{" "}
                  {skill?.focus ? `, ${skill.focus} Focus` : undefined}
                </em>
              </Text>
              <Text whiteSpace="nowrap">
                <em>
                  Range:{" "}
                  {skill?.range && !isNaN(parseInt(skill?.range ?? "-"))
                    ? skill?.range + " ft."
                    : skill?.range?.[0]?.toUpperCase() +
                      (skill?.range?.slice(1) ?? "")}
                </em>
              </Text>
            </VStack>
          </VStack>
        </HStack>
        {Icon && <Icon size={120} color="black" />}
      </HStack>
      <VStack gap="md">
        <Box borderTop="5px solid" borderTopColor="page.border.100" w="80%" />
        <MaybeHTML
          maybeHtml={skill?.description ?? ""}
          fontSize="2.5rem"
          lineHeight="1.25"
          px="xl"
          w="full"
          css={{ "& br": { mb: "lg" }, "& p": { fontSize: "2.5rem" } }}
        />
        <Text fontSize="1.5rem" p="sm" w="full">
          CELESTUS - VP.4.7.0{" "}
        </Text>
      </VStack>
    </Flex>
  );
}
