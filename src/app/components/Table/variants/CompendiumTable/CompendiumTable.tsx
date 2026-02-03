import { Box } from "styled-system/jsx";
import { Table } from "../../Table";
import type { ColumnDef, RowData } from "@tanstack/table-core";
import { css } from "styled-system/css";
import type { TableSelectProps } from "../../types";

export type CompendiumTableProps<T extends RowData> = {
  data: T[];
  columns: ColumnDef<T>[];
  busy?: boolean;
  selectProps?: TableSelectProps<T>;
};

export function CompendiumTable<T extends RowData>({
  data,
  columns,
  busy,
  selectProps,
}: CompendiumTableProps<T>) {
  return (
    <Box
      backgroundColor="page.surface.300"
      maxH="full"
      w="full"
      p="xs"
      rounded="md"
      border="2px solid"
      borderColor="page.border.initial"
      boxShadow="md"
    >
      <Table
        data={data}
        columns={columns}
        busy={busy}
        rootProps={{
          css: {
            rounded: "md",
            maxW: "100%",
            maxH: "full",
            borderCollapse: "separate",
          },
          decoration: "zebra",
        }}
        classNames={{
          cell: css({
            textStyle: "body-sm",
            maxH: "min-content",
            borderTop: "none",
            borderBottom: "none",
            p: "sm",
            cursor: "default",
          }),
          headCell: css({
            p: "sm",
            fontWeight: "bold",
            backgroundColor: "transparent",
            fontVariant: "small-caps",
          }),
          body: css({ backgroundColor: "transparent" }),
          row: css({
            _hover: {
              bgColor: "page.surface.200",
              outline: "1px solid",
              outlineColor: "page.border.initial",
            },
          }),
          headRow: css({
            bgColor: "page.surface.300",
            outline: "1px solid",
          }),
        }}
        selectProps={
          selectProps
            ? {
                ...selectProps,
                className:
                  selectProps?.className ??
                  css({
                    outline: "1px solid",
                    bgColor: "page.surface.300",
                    fontWeight: "bold",
                  }),
              }
            : undefined
        }
        scrollable
      />
    </Box>
  );
}
