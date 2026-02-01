import {
  getCoreRowModel,
  useReactTable,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import type { TableProps } from "./types";
import { useMemo, useState, type PropsWithChildren } from "react";
import { Table as CTable } from "@cerberus/react";
import { TableHead } from "./components/TableHead";
import { TableBody } from "./components/TableBody";
import { Flex, Scrollable } from "styled-system/jsx";
import { TableSearch } from "./components/TableSearch";
import { flattenJson } from "@/lib/json/flattenJson";
import { resolveJsonPath } from "@/lib/json/resolveJsonPath";

const DEFAULT_BUSY_ROWS = 25;

export function Table<T extends RowData>(
  props: PropsWithChildren<TableProps<T>>,
) {
  "use no memo";
  const { columns, data } = props;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const searchRegex = searchTerm
    .split(/[\.,-_\s]/)
    .map((term) => new RegExp(`${term}`, "i"));
  const reMatch = (value: string) =>
    searchRegex.some((regex) => regex.test(value));

  const filteredData = useMemo(
    () =>
      data.filter((o) =>
        Object.values(flattenJson(o as object, 2) ?? {}).some((v) =>
          reMatch(JSON.stringify(v)),
        ),
      ),
    [searchTerm, data],
  );

  const sortedData = useMemo(() => {
    const res = filteredData.slice();
    for (const status of sorting) {
      const key = status.id;
      // sort based on sort status
      const [lt, gt] = status?.desc ? [1, -1] : [-1, 1];
      res.sort((a: any, b: any) => {
        if (a === b) return NaN;
        return resolveJsonPath(key, a) < resolveJsonPath(key, b) ? lt : gt;
      });
    }
    return res;
  }, [filteredData, sorting]);

  const table = useReactTable<T>({
    columns,
    data: sortedData,
    getCoreRowModel: getCoreRowModel<T>(),
    state: {
      sorting,
    },
    onSortingChange: (...args) => {
      setSorting([]);
      setSorting(...args);
    },
  });

  const tcontent = (
    <CTable.Root {...props.rootProps} sticky size="sm">
      <TableHead table={table} classNames={props?.classNames} />
      <TableBody
        table={table}
        classNames={props?.classNames}
        selectProps={props?.selectProps}
        busy={props?.busy}
        busyRowCount={
          props?.busyRowCount === undefined
            ? DEFAULT_BUSY_ROWS
            : props?.busyRowCount
        }
      />
    </CTable.Root>
  );

  const tNode = props.scrollable ? (
    <Scrollable maxH="full">{tcontent}</Scrollable>
  ) : (
    tcontent
  );

  return (
    <Flex flexDir="column" gap="sm" alignItems="stretch" maxH="full">
      <TableSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {tNode}
    </Flex>
  );
}
