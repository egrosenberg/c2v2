import type { Route } from "next";

export const routeDefs = {
  skillsCompendium: ({ skillId }: { skillId?: string }) =>
    (skillId
      ? `/compendiums/skills/${skillId}`
      : "/compendiums/skills") as Route,
} as const;
