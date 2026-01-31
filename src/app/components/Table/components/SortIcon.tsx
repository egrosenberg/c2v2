import {
  ArrowsVertical,
  SortAscending,
  SortDescending,
} from "@carbon/icons-react";
import type { SortStatus } from "../types";

type Options = { sortStatus: SortStatus };

export function SortIcon({ sortStatus }: Options) {
  switch (sortStatus) {
    case "asc":
      return <SortAscending size={24} />;
    case "desc":
      return <SortDescending size={24} />;
    default:
      return <ArrowsVertical size={24} />;
  }
}
