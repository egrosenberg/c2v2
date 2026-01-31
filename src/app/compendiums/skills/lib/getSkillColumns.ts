import type { Skill, SkillWithRelations } from "@db/tables/skills";
import type { ColumnDef } from "@tanstack/table-core";
import type { Dispatch, SetStateAction } from "react";
import { css } from "styled-system/css";

type Options = {
  skill: SkillWithRelations;
  setSkill: Dispatch<SetStateAction<SkillWithRelations>>;
};

export function getSkillColumns(): ColumnDef<SkillWithRelations>[] {
  return [
    {
      header: "Name",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      header: "Type",
      accessorKey: "type",
      enableSorting: true,
      meta: {
        className: css({ textAlign: "center" }),
        headClassName: css({ textAlign: "center" }),
      },
    },
    {
      header: "Subtype(s)",
      accessorKey: "subtype",
      enableSorting: true,
      cell: (ctx) =>
        ctx.row.original.subtype
          ?.split(",")
          .map((str) => str[0]?.toUpperCase() + str?.slice(1))
          .join(" "),
      meta: {
        className: css({ textAlign: "center" }),
        headClassName: css({ textAlign: "center" }),
      },
    },
    {
      header: "A",
      accessorKey: "actions",
      enableSorting: true,
      meta: {
        className: css({ textAlign: "center" }),
        headClassName: css({ textAlign: "center" }),
      },
    },
    {
      header: "F",
      accessorKey: "focus",
      enableSorting: true,
      cell: (ctx) => ctx.getValue() ?? "-",
      meta: {
        className: css({ textAlign: "center" }),
        headClassName: css({ textAlign: "center" }),
      },
    },
  ];
}
