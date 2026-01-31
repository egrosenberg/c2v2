import type { TableRootProps } from "@cerberus/react";
import type { ColumnDef, RowData } from "@tanstack/react-table";
import type { Table as TableType } from "@tanstack/table-core";
import type { Table as CTable } from "@cerberus/react";
import type { ComponentProps, Dispatch, SetStateAction } from "react";

export type TableClassNames = {
  row?: string;
  body?: string;
  cell?: string;
  headCell?: string;
  headRow?: string;
  head?: string;
  global?: string;
};

export type TableSelectProps<T extends RowData> = {
  setSelected: Dispatch<SetStateAction<T | undefined>>;
  selected: T | undefined;
  accessorKey?: string; // default 'id'
  className?: string;
};

export type TableProps<T extends RowData> = {
  columns: ColumnDef<T, any>[];
  data: T[];
  rootProps?: TableRootProps;
  scrollable?: boolean;
  classNames?: TableClassNames;
  selectProps?: TableSelectProps<T>;
};

export type TableHeadProps<T extends RowData> = {
  table: TableType<T>;
  classNames?: TableClassNames;
};

export type TableBodyProps<T extends RowData> = {
  table: TableType<T>;
  classNames?: TableClassNames;
  selectProps?: TableSelectProps<T>;
};

export type TableSearchProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

export type CellMeta = {
  className?: string;
  headClassName?: string;
};

export type SortStatus = "desc" | "asc" | undefined;
