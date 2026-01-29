"use client";

import { Box, Flex } from "styled-system/jsx";
import { useService } from "@/api";
import { svcFindSkills } from "@/api/skills";
import { css } from "styled-system/css";
import { useEffect, useState } from "react";
import type { SkillWithRelations } from "@db/tables/skills";
import type { Aspect } from "@db/tables/aspects";
import { Button, Text } from "@cerberus/react";
import { MainContentWrapper } from "@/components/Wrappers/MainContentWrapper";

const formatSource = (skill: SkillWithRelations | undefined) => {
  if (!skill?.source) return;
  if (skill.sourceType === "aspect") {
    const source = skill.source as Aspect;
    return `Apsect of ${source?.categoryPrefix ? source?.categoryPrefix + " " : ""}${source.category}: ${source.name}`;
  }
  if (skill.sourceType === "domain") {
    return `${skill.source.name} Domain`;
  }
  if (skill.sourceType === "class") {
    return `${skill.source.name} Class`;
  }
  return skill.source.name;
};

export function SkillsCompendium() {
  const { data, error } = useService(svcFindSkills);
  // const skill = data?.records[0];
  const skills = data?.records ?? [];

  const [skill, setSkill] = useState<SkillWithRelations | undefined>(undefined);

  useEffect(() => {
    if (!skill && skills[0]) setSkill(skills[0]);
  }, [data]);

  const busy = !data || !!error;

  return (
    <MainContentWrapper>
      <Flex w="full" h="full" alignItems="center" flexDir="column" gap="md">
        <Box w="full">
          <Text as="h1" textStyle="heading-xl" fontFamily="uncial">
            Skills
          </Text>
          <Box
            h="1rem"
            w="full"
            borderTop="1px solid"
            borderTopColor="page.border.100"
            gradientFrom="page.surface.200"
            gradientTo="transparent"
            bgGradient="to-b"
          />
        </Box>
        <Flex
          flexDir="row"
          justifyContent="space-between"
          flex="1"
          maxH="full"
          w="full"
          maxWidth="77rem"
        >
          <Flex flexDir="column" gap="sm" alignItems="stretch" w="30rem">
            {/* <Boxre>{JSON.stringify(data, null, 2)}</pre> */}
            <Text
              aria-busy={busy}
              textStyle="heading-lg"
              fontVariant="small-caps"
            >
              {skill?.name}
            </Text>
            <Text aria-busy={busy} textStyle="heading-sm">
              {skill?.type} Skill
              {skill?.subtype && " - " + skill.subtype.replaceAll(",", " ")}
            </Text>
            <Text aria-busy={busy} textStyle="label-md">
              <strong>Cost: </strong>
              {skill?.actions} Actions{" "}
              {skill?.focus && `, ${skill.focus} Focus`}
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
            <Flex
              aria-busy={busy}
              textStyle="body-md"
              gap="xs"
              flexDir="column"
            >
              {skill?.description
                ?.split("\n")
                .map((str, i) => <p key={i}>{str}</p>)}
            </Flex>
            <Text
              aria-busy={busy}
              textStyle="label-md"
              color="success.text.100"
            >
              Source - {formatSource(skill)}
            </Text>
          </Flex>
          <Flex
            flexDir="column"
            overflow="scroll"
            bgColor="page.surface.200"
            p="md"
            rounded="lg"
          >
            {skills.map((s) => (
              <Button
                key={s.id}
                usage="ghost"
                shape="rounded"
                rounded="md"
                p="sm"
                palette="action"
                className={css(
                  skill?.id === s.id
                    ? { backgroundColor: "action.bg.active" }
                    : { fontWeight: "normal" },
                )}
                onClick={() =>
                  setSkill(skills.find((skill) => skill.id === s.id))
                }
              >
                {s.name}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </MainContentWrapper>
  );
}
