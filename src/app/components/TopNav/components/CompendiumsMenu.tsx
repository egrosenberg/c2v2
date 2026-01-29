"use client";

import { Book } from "@carbon/icons-react";
import { NavMenu, type NavMenuItemProps } from "./NavMenu";

export function CompendiumsMenu() {
  const compendiumItems: NavMenuItemProps[] = [
    {
      label: "Skills",
      onClick: () => console.log("SKILLS"),
      href: "/compendiums/skills",
      icon: <Book />,
    },
  ];

  return <NavMenu label="Compendiums" items={compendiumItems} />;
}
