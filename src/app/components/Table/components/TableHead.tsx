import { flexRender, type Header, type RowData } from "@tanstack/react-table";
import type { CellMeta, SortStatus, TableHeadProps } from "../types";
import { Table as CTable, For, IconButton, Show } from "@cerberus/react";
import { css, cx } from "styled-system/css";
import { SortIcon } from "./SortIcon";
import { Box, Flex, HStack } from "styled-system/jsx";

export function TableHead<T extends RowData>({
  table,
  classNames,
}: TableHeadProps<T>) {
  "use no memo";

  const columnSortStatus = (header: Header<T, unknown>): SortStatus => {
    const entry = table.getState().sorting.find((s) => s.id === header.id);
    if (entry) return entry.desc ? "desc" : "asc";
    return undefined;
  };

  const sortByColumn = (
    header: Header<T, unknown>,
    currentStatus: SortStatus,
  ) => {
    let nextStatus;
    switch (currentStatus) {
      case "asc":
        nextStatus = "desc";
        break;
      case "desc":
        nextStatus = undefined;
        break;
      default:
        nextStatus = "asc";
    }

    table.setSorting((current) => {
      // const newState = [...current];
      const index = current.findIndex((s) => s.id === header.id);
      if (index === -1) {
        return [{ id: header.id, desc: false }];
      } else {
        if (currentStatus === "asc") {
          return [{ id: header.id, desc: true }];
        }

        return [];
      }
      // return newState;
    });
  };

  return (
    <CTable.Header className={classNames?.head}>
      <For each={table.getHeaderGroups()}>
        {(hg) => (
          <CTable.Row key={hg.id} className={classNames?.headRow}>
            <For each={hg.headers}>
              {(header) => {
                const sortable = header.column.columnDef.enableSorting;
                const sortStatus = columnSortStatus(header);
                const sortableStyle = sortable
                  ? cx(
                      css({
                        cursor: "pointer",
                        transition: "all 0.2s",
                        _hover: { bgColor: "page.surface.100", pr: "16px" },
                      }),
                      sortStatus ? css({ pr: "16px" }) : undefined,
                    )
                  : undefined;

                return (
                  <CTable.HeaderCol
                    key={header.id}
                    className={cx(
                      classNames?.headCell,
                      (header.column.columnDef.meta as CellMeta)?.[
                        "headClassName"
                      ],
                      sortableStyle,
                      css({
                        position: "relative",
                        overflow: "hidden",
                      }),
                      "group",
                    )}
                    onClick={() => sortByColumn(header, sortStatus)}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {sortable && (
                      <HStack
                        position="absolute"
                        top="0"
                        h="full"
                        transition="all 0.2s"
                        w="24px"
                        _groupHover={{
                          ml: "0",
                          opacity: "100%",
                          right: "xs",
                        }}
                        className={
                          sortStatus
                            ? css({ right: "xs" })
                            : css({
                                ml: "-24px",
                                right: "-24px",
                                opacity: "0",
                              })
                        }
                      >
                        <SortIcon sortStatus={sortStatus} />
                      </HStack>
                    )}
                  </CTable.HeaderCol>
                );
              }}
            </For>
          </CTable.Row>
        )}
      </For>
    </CTable.Header>
  );
}
