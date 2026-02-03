"use client";

import { Box, Flex } from "styled-system/jsx";
import { useQuery } from "@/api";
import { svcFindSkills, svcGetSkill } from "@/api/skills";
import { css } from "styled-system/css";
import { useEffect, useState } from "react";
import type { SkillWithRelations } from "@db/tables/skills";
import { Text } from "@cerberus/react";
import { MainContentWrapper } from "@/components/Wrappers/MainContentWrapper";
import { getSkillColumns } from "../lib/getSkillColumns";
import { CompendiumTable } from "@/components/Table/variants/CompendiumTable/CompendiumTable";
import { SkillDescription } from "./SkillDescription";
import { useParams } from "next/navigation";
import { routeDefs } from "@/lib/routeDefs";
import { getSkillPageTitle } from "../lib/metaFunctions";

export function SkillsCompendium() {
  const { data, error } = useQuery(svcFindSkills);
  const { skillId } = useParams();
  const skills = data?.records ?? [];

  const [skill, setSkill] = useState<SkillWithRelations | undefined>(undefined);

  const { data: activeSkill, processing: activeSkillBusy } = useQuery(
    svcGetSkill,
    {
      options: { id: skill?.id || skillId },
    },
    [skillId || 0, skill || 0, skillId || skill],
  );

  useEffect(() => {
    if (skill) {
      window.history.pushState(
        null,
        skill.name,
        routeDefs.skillsCompendium({ skillId: skill.id }),
      );
      document.title = getSkillPageTitle(skill);
    }
  }, [skill]);

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
          <SkillDescription
            skill={activeSkill || undefined}
            busy={!activeSkill && !!skillId && activeSkillBusy}
          />
          <CompendiumTable
            data={skills}
            columns={getSkillColumns()}
            busy={!(skills || error)}
            selectProps={{
              selected: activeSkill ?? skill,
              setSelected: setSkill,
              className: css({
                outline: "1px solid",
                bgColor: "page.surface.300",
              }),
            }}
          />
        </Flex>
      </Flex>
    </MainContentWrapper>
  );
}
