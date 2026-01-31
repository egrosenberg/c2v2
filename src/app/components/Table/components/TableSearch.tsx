import { Input } from "@cerberus/react";
import type { TableSearchProps } from "../types";
import { Search } from "@carbon/icons-react";

export function TableSearch({ searchTerm, setSearchTerm }: TableSearchProps) {
  return (
    <Input
      type="search"
      startIcon={<Search />}
      onChange={(ev) => setSearchTerm(ev.currentTarget.value)}
      value={searchTerm}
      size="sm"
    ></Input>
  );
}
