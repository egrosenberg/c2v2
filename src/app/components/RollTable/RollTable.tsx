import { For, Table } from "@cerberus/react";
import { css, cx } from "styled-system/css";

export type RollTableType = {
  heading: string;
  values: string[];
}[];
export type RollTableProps = {
  table: RollTableType;
};

const inverseCell = css({
  bgColor: "page.surface.inverse",
  color: "page.text.inverse",
  rounded: 0,
  py: "xs",
  px: "sm",
});
const numberCell = cx(
  inverseCell,
  css({
    textAlign: "center",
    textStyle: "heading-xs",
  }),
);
const headingCell = cx(
  inverseCell,
  css({
    textStyle: "heading-md",
    fontVariantCaps: "small-caps",
  }),
);
const dataCell = css({
  py: "xs",
});

export function RollTable({ table }: RollTableProps) {
  let height = 0;
  for (const column of table) {
    if (column.values.length > height) height = column.values.length;
  }
  return (
    <Table.Root className={css({ rounded: 0 })} size="sm">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCol className={headingCell}></Table.HeaderCol>
          <For each={table}>
            {(col, i) => (
              <Table.HeaderCol key={i} className={headingCell}>
                {col.heading}
              </Table.HeaderCol>
            )}
          </For>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <For each={Array.from({ length: height }) as number[]}>
          {(_u, i) => {
            return (
              <Table.Row key={i}>
                <Table.Cell className={numberCell}>{i + 1}</Table.Cell>
                <For each={table}>
                  {(column, j) => (
                    <Table.Cell key={j} className={dataCell}>
                      {column.values[i]}
                    </Table.Cell>
                  )}
                </For>
              </Table.Row>
            );
          }}
        </For>
      </Table.Body>
    </Table.Root>
  );
}
