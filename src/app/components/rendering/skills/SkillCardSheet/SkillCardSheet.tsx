import { Flex, Grid } from "styled-system/jsx";
import { pageCss } from "../../types";
import type { SkillWithRelations } from "@db/tables/skills";
import { For } from "@cerberus/react";
import SkillCard from "../SkillCard/SkillCard";
import type { Ref } from "react";

export default function SkillCardSheet({
  skills,
  ref,
}: {
  skills: SkillWithRelations[];
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <Flex
      className={pageCss}
      position="relative"
      alignItems="center"
      justifyContent="center"
      ref={ref}
      bgColor="white"
    >
      <Grid
        gridTemplateColumns="repeat(3, 1fr)"
        borderCollapse="collapse"
        gridGap="0"
      >
        <For each={skills}>
          {(skill, index) => <SkillCard skill={skill} key={index}></SkillCard>}
        </For>
      </Grid>
    </Flex>
  );
}
