import { LayoutRoutes } from ".next/dev/types/routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celestus | Skills",
  description: "Celestus TTRPG Skills",
};

export default async function RootLayout(props: LayoutProps<LayoutRoutes>) {
  return props.children;
}
