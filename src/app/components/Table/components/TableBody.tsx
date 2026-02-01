import { flexRender, type RowData } from "@tanstack/react-table";
import type { CellMeta, TableBodyProps } from "../types";
import { Table as CTable } from "@cerberus/react";
import { cx } from "styled-system/css";
import { resolveJsonPath } from "@/lib/json/resolveJsonPath";
import { BusyRows } from "./TableBusy";

export function TableBody<T extends RowData>({
  table,
  classNames,
  selectProps,
  busy,
  busyRowCount,
}: TableBodyProps<T>) {
  "use no memo";

  const selectedId = selectProps?.selected
    ? resolveJsonPath(selectProps?.accessorKey ?? "id", selectProps.selected)
    : undefined;

  return (
    <CTable.Body css={{ overflowY: "scroll" }} className={classNames?.body}>
      {busy ? (
        <BusyRows count={busyRowCount} nCols={table.getAllColumns().length} />
      ) : (
        table.getRowModel().rows.map((row) => {
          // special styling for selected row
          const selected =
            selectedId ===
            resolveJsonPath(selectProps?.accessorKey ?? "id", row.original);

          const selectedCName = selected
            ? cx(selectProps?.className, "cdb-selected-row")
            : undefined;

          const onClick = selectProps?.setSelected
            ? () => selectProps?.setSelected(row.original)
            : undefined;

          return (
            <CTable.Row
              key={row.id}
              className={cx(classNames?.row, selectedCName)}
              onClick={onClick}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <CTable.Cell
                    key={cell.id}
                    className={cx(
                      classNames?.cell,
                      (cell.column.columnDef.meta as CellMeta)?.["className"],
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </CTable.Cell>
                );
              })}
            </CTable.Row>
          );
        })
      )}
    </CTable.Body>
  );
}
