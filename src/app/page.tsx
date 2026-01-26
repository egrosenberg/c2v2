"use client";

import { Box, Flex } from "styled-system/jsx";
import { useService } from "@/api";
import { svcFindSkills } from "./api/skills";
import { css } from "styled-system/css";
import { useEffect, useState } from "react";
import { SkillWithRelations } from "@db/tables/skills";
import { Aspect } from "@db/tables/aspects";

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

export default function Page() {
  const { data } = useService(svcFindSkills);
  // const skill = data?.records[0];
  const skills = data?.records ?? [];

  const [skill, setSkill] = useState<SkillWithRelations | undefined>(undefined);

  useEffect(() => {
    if (!skill && skills[0]) setSkill(skills[0]);
  }, [data]);

  return (
    <Flex flexDir="row" p="5rem" justifyContent="space-between" h="full">
      <Flex flexDir="column" gap="sm" alignItems="stretch" w="30rem">
        {/* <Boxre>{JSON.stringify(data, null, 2)}</pre> */}
        <h1 aria-busy={!data} className={css({ textStyle: "heading-md" })}>
          {skill?.name}
        </h1>
        <h2 aria-busy={!data} className={css({ textStyle: "heading-sm" })}>
          {skill?.type} Skill
          {skill?.subtype && " - " + skill.subtype.replaceAll(",", " ")}
        </h2>
        <Box aria-busy={!data} className={css({ textStyle: "label-md" })}>
          Cost: {skill?.actions} Actions{" "}
          {skill?.focus && `, ${skill.focus} Focus`}
        </Box>
        {skill?.range !== null && (
          <Box aria-busy={!data} className={css({ textStyle: "label-md" })}>
            Range:{" "}
            {skill?.range !== undefined &&
              (isNaN(parseInt(skill?.range))
                ? skill.range[0]?.toUpperCase() + skill.range.slice(1)
                : `${skill?.range} ft.`)}
          </Box>
        )}
        <Flex aria-busy={!data} textStyle="body-md" gap="xs" flexDir="column">
          {skill?.description
            ?.split("\n")
            .map((str, i) => <p key={i}>{str}</p>)}
        </Flex>
        <Box
          aria-busy={!data}
          className={css({ textStyle: "label-md", color: "info.text.initial" })}
        >
          Source - {formatSource(skill)}
        </Box>
      </Flex>
      <Flex flexDir="column" overflow="scroll">
        {skills.map((s) => (
          <button
            key={s.id}
            className={
              s.id === skill?.id
                ? css({
                    fontWeight: "bold",
                    p: "xs",
                    backgroundColor: "info.bg.active",
                  })
                : css({
                    p: "xs",
                    _hover: {
                      bgColor: "info.bg.hover",
                    },
                  })
            }
            onClick={() => setSkill(skills.find((skill) => skill.id === s.id))}
          >
            {s.name}
          </button>
        ))}
      </Flex>
    </Flex>
  );
}
