import { formatSource } from "@/compendiums/lib/formatSource";
import { Text } from "@cerberus/react";
import type { SkillWithRelations } from "@db/tables/skills";
import { Box, Flex } from "styled-system/jsx";

export function SkillDescription({
  skill,
  busy,
}: {
  skill?: SkillWithRelations | undefined;
  busy?: boolean;
}) {
  if (!skill && !busy) return;

  return (
    <Flex
      flexDir="column"
      gap="sm"
      alignItems="stretch"
      w="40rem"
      bgColor="page.surface.200"
      p="md"
      h="min-content"
      rounded="md"
      boxShadow="md"
    >
      <Text
        aria-busy={busy}
        textStyle="heading-lg"
        fontVariant="small-caps"
        borderBottom="1px solid"
        borderBottomColor="page.border.200"
      >
        {skill?.name}
      </Text>
      <Text aria-busy={busy} textStyle="heading-sm">
        {skill?.type} Skill
        {skill?.subtype && " - " + skill.subtype.replaceAll(",", " ")}
      </Text>
      <Text aria-busy={busy} textStyle="label-md">
        <strong>Cost: </strong>
        {skill?.actions} Actions{skill?.focus && `, ${skill.focus} Focus`}
      </Text>
      {skill?.range !== null && (
        <Text aria-busy={busy} textStyle="label-md">
          <strong>Range: </strong>
          {skill?.range !== undefined &&
            (isNaN(parseInt(skill?.range))
              ? skill.range[0]?.toUpperCase() + skill.range.slice(1)
              : `${skill?.range} ft.`)}
        </Text>
      )}
      <Flex aria-busy={busy} textStyle="body-md" gap="xs" flexDir="column">
        {skill?.description?.split("\n").map((str, i) => <p key={i}>{str}</p>)}
      </Flex>
      <Text aria-busy={busy} textStyle="label-md" color="success.text.100">
        Source - {formatSource(skill)}
      </Text>
    </Flex>
  );
}
