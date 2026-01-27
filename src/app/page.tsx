"use client";

import { Box, Flex } from "styled-system/jsx";
import { useService } from "@/api";
import { svcFindSkills } from "./api/skills";
import { css } from "styled-system/css";
import { useEffect, useState } from "react";
import { SkillWithRelations } from "@db/tables/skills";
import { Aspect } from "@db/tables/aspects";
import { Button, Text } from "@cerberus/react";

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
        <Text aria-busy={!data} textStyle="heading-md">
          {skill?.name}
        </Text>
        <Text aria-busy={!data} textStyle="heading-sm">
          {skill?.type} Skill
          {skill?.subtype && " - " + skill.subtype.replaceAll(",", " ")}
        </Text>
        <Text aria-busy={!data} textStyle="label-md">
          Cost: {skill?.actions} Actions{" "}
          {skill?.focus && `, ${skill.focus} Focus`}
        </Text>
        {skill?.range !== null && (
          <Text aria-busy={!data} textStyle="label-md">
            Range:{" "}
            {skill?.range !== undefined &&
              (isNaN(parseInt(skill?.range))
                ? skill.range[0]?.toUpperCase() + skill.range.slice(1)
                : `${skill?.range} ft.`)}
          </Text>
        )}
        <Flex aria-busy={!data} textStyle="body-md" gap="xs" flexDir="column">
          {skill?.description
            ?.split("\n")
            .map((str, i) => <p key={i}>{str}</p>)}
        </Flex>
        <Text aria-busy={!data} textStyle="label-md" color="info.text.initial">
          Source - {formatSource(skill)}
        </Text>
      </Flex>
      <Flex flexDir="column" overflow="scroll">
        {skills.map((s) => (
          <Button
            key={s.id}
            usage="ghost"
            shape="rounded"
            p="sm"
            palette="action"
            className={css(
              skill?.id === s.id
                ? { backgroundColor: "action.bg.active" }
                : { fontWeight: "normal" },
            )}
            onClick={() => setSkill(skills.find((skill) => skill.id === s.id))}
          >
            {s.name}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}
