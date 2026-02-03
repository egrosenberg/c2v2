"use client";

import { useQuery } from "@/api";
import { svcFindSkills } from "./api/skills";
import { useEffect, useState } from "react";
import type { SkillWithRelations } from "@db/tables/skills";
import { Text } from "@cerberus/react";
import { MainContentWrapper } from "./components/Wrappers/MainContentWrapper";

export default function Page() {
  const { data } = useQuery(svcFindSkills);
  // const skill = data?.records[0];
  const skills = data?.records ?? [];

  const [skill, setSkill] = useState<SkillWithRelations | undefined>(undefined);

  useEffect(() => {
    if (!skill && skills[0]) setSkill(skills[0]);
  }, [data]);

  return (
    <MainContentWrapper>
      <Text as="h1" fontFamily="uncial" textStyle="heading-2xl">
        Celestus
      </Text>
    </MainContentWrapper>
  );
}
