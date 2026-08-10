import type { Route } from "next";

export const routeDefs = {
  skillsCompendium: ({ skillId }: { skillId?: string }) =>
    (skillId
      ? `/compendiums/skills/${skillId}`
      : "/compendiums/skills") as Route,
  classPage: ({ keeperClassId }: { keeperClassId?: string }) =>
    (keeperClassId ? `/classes/${keeperClassId}` : "/classes") as Route,
} as const;
