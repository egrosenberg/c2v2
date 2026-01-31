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
import { Table } from "@/components/Table/Table";
import { getSkillColumns } from "../lib/getSkillColumns";

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
          gap="lg"
        >
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
            {/* <Boxre>{JSON.stringify(data, null, 2)}</pre> */}
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
          <Box
            backgroundColor="page.surface.300"
            maxH="full"
            w="full"
            p="xs"
            rounded="md"
            border="2px solid"
            borderColor="page.border.initial"
            boxShadow="md"
          >
            <Table
              data={skills}
              columns={getSkillColumns()}
              rootProps={{
                css: {
                  rounded: "md",
                  maxW: "100%",
                  maxH: "full",
                  borderCollapse: "separate",
                },
                decoration: "zebra",
              }}
              classNames={{
                cell: css({
                  textStyle: "body-sm",
                  maxH: "min-content",
                  borderTop: "none",
                  borderBottom: "none",
                  p: "sm",
                  cursor: "default",
                }),
                headCell: css({
                  p: "sm",
                  fontWeight: "bold",
                  backgroundColor: "transparent",
                  fontVariant: "small-caps",
                }),
                body: css({ backgroundColor: "transparent" }),
                headRow: css({
                  bgColor: "page.surface.300",
                  outline: "1px solid",
                }),
              }}
              selectProps={{
                selected: skill,
                setSelected: setSkill,
                className: css({
                  outline: "1px solid",
                  bgColor: "page.surface.300",
                }),
              }}
              scrollable
            />
          </Box>
        </Flex>
      </Flex>
    </MainContentWrapper>
  );
}
