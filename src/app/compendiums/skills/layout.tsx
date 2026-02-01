import type { LayoutRoutes } from ".next/dev/types/routes";
import type { Metadata } from "next";
import { getSkillPageTitle } from "./lib/metaFunctions";

export const metadata: Metadata = {
  title: getSkillPageTitle(),
  description: "Celestus TTRPG Skills",
};

export default async function RootLayout(props: LayoutProps<LayoutRoutes>) {
  return <>{props.children}</>;
}
