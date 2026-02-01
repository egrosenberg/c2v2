import { For, Table as CTable } from "@cerberus/react";
import { Box } from "styled-system/jsx";

export function BusyCell() {
  return (
    <CTable.Cell p="sm" px="0">
      <Box w="full" h="full" minH="2rem" aria-busy />
    </CTable.Cell>
  );
}

export function BusyRows({ count, nCols }: { count: number; nCols: number }) {
  console.log({ nCols });
  return (
    <For each={new Array(count).keys().toArray()}>
      {(i) => (
        <CTable.Row key={i}>
          <For each={new Array(nCols).keys().toArray()}>
            {(j) => <BusyCell key={j} />}
          </For>
        </CTable.Row>
      )}
    </For>
  );
}
