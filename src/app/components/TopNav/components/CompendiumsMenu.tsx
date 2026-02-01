"use client";

import { Book } from "@carbon/icons-react";
import { NavMenu, type NavMenuItemProps } from "./NavMenu";

export function CompendiumsMenu() {
  const compendiumItems: NavMenuItemProps[] = [
    {
      label: "Skills",
      href: "/compendiums/skills",
      icon: <Book />,
    },
  ];

  return <NavMenu label="Compendiums" items={compendiumItems} />;
}
