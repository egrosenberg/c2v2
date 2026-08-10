"use client";

import { Box, Flex } from "styled-system/jsx";
import { useQuery } from "@/api";
import {
  svcFindSkills,
  svcFindSkillsAggregates,
  svcGetSkill,
} from "@/api/skills";
import { css } from "styled-system/css";
import { useEffect, useMemo, useState } from "react";
import type { SkillWithRelations } from "@db/tables/skills";
import { Text } from "@cerberus/react";
import { MainContentWrapper } from "@/components/Wrappers/MainContentWrapper";
import { getSkillColumns } from "../lib/getSkillColumns";
import {
  CompendiumTable,
  type FilterItem,
} from "@/components/Table/variants/CompendiumTable/CompendiumTable";
import { SkillDescription } from "./SkillDescription";
import { useParams } from "next/navigation";
import { routeDefs } from "@/lib/routeDefs";
import { getSkillPageTitle } from "../lib/metaFunctions";
import { SkillsFilterDialog } from "./SkillsFilter/SkillsFilter";
import type { SubmitHandler } from "react-hook-form";
import type { SkillsFilter } from "@db/services/skills/types";
import { sentenceCase } from "@/lib/string/sentenceCase";

export function SkillsCompendium() {
  const [skill, setSkill] = useState<SkillWithRelations | undefined>(undefined);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<SkillsFilter>({});

  const { data: skillsData, error } = useQuery(
    svcFindSkills,
    { options: { filter } },
    [filter],
  );
  const { data: aggregates } = useQuery(svcFindSkillsAggregates);

  const { skillId } = useParams();
  const skills = skillsData?.records ?? [];

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

  const submitFilter: SubmitHandler<SkillsFilter> = (data) => {
    setFilter(data);
  };

  const activeFilterItems = useMemo(() => {
    const items: FilterItem[] = [];
    const actionFilters = (filter.actions as string[]) ?? [];
    for (const value of actionFilters) {
      items.push({
        label: `${value} Action${value === "1" ? "" : "s"}`,
        fieldName: "actions",
        fieldValue: value,
      });
    }
    const focusFilters = (filter.focus as string[]) ?? [];
    for (const value of focusFilters) {
      items.push({
        label: `${value} Focus`,
        fieldName: "focus",
        fieldValue: value,
      });
    }
    const typeFilters = (filter.type as string[]) ?? [];
    for (const value of typeFilters) {
      items.push({
        label: sentenceCase(value),
        fieldName: "type",
        fieldValue: value,
      });
    }
    const subtypeFilters = (filter.subtype as string[]) ?? [];
    for (const value of subtypeFilters) {
      items.push({
        label: sentenceCase(value),
        fieldName: "type",
        fieldValue: value,
      });
    }
    // const sourceFilters = filter.sourceId as string[];
    // for (const value of subtypeFilters) {
    //   const
    //   items.push({
    //     label: sentenceCase(value),
    //     fieldName: "sourceId",
    //     fieldValue: value,
    //   });
    // }

    return items;
  }, [filter]);

  console.log(activeFilterItems);

  return (
    <>
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
          flexDir={{ base: "column", md: "row" }}
          justifyContent="space-between"
          flex="1"
          maxH={{ base: "", md: "calc(100% - var(--cerberus-spacing-md) * 2)" }}
          w="full"
          maxWidth="77rem"
          gap="lg"
          transition="all 0.2s"
        >
          <SkillDescription
            skill={activeSkill || undefined}
            busy={!activeSkill && !!skillId && activeSkillBusy}
          />
          <CompendiumTable
            data={skills}
            columns={getSkillColumns()}
            busy={!(skills || error)}
            openFilter={() => setFilterOpen(true)}
            selectProps={{
              selected: activeSkill ?? skill,
              setSelected: setSkill,
              className: css({
                outline: "1px solid",
                bgColor: "page.surface.300",
              }),
            }}
            activeFilters={activeFilterItems}
          />
        </Flex>
      </Flex>
      <SkillsFilterDialog
        open={filterOpen}
        setOpen={setFilterOpen}
        onSubmit={submitFilter}
        defaultValues={filter}
        aggregates={aggregates}
      />
    </>
  );
}
