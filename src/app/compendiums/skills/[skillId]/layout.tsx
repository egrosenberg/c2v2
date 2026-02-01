import type { LayoutRoutes } from ".next/dev/types/routes";
import { getSkill } from "@db/services/skills/get-skill";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getSkillPageMeta, getSkillPageTitle } from "../lib/metaFunctions";

export const metadata: Metadata = {
  title: getSkillPageTitle(),
  description: "Celestus TTRPG Skills",
};

export default async function RootLayout(props: LayoutProps<LayoutRoutes>) {
  const params = await props.params;
  let skill;
  try {
    if ("skillId" in params) skill = await getSkill({ id: params.skillId });
  } catch {}

  return (
    <>
      {getSkillPageMeta(skill)}
      <Suspense>{props.children}</Suspense>
    </>
  );
}
