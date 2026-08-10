import { Flex } from "styled-system/jsx";
import type { FilterItem } from "../../CompendiumTable";
import { For, Tag } from "@cerberus/react";

export type CompendiumFiltersDisplayProps = {
  activeFilters: FilterItem[];
};

export function CompendiumFiltersDisplay({
  activeFilters,
}: CompendiumFiltersDisplayProps) {
  if (!activeFilters.length) return;
  return (
    <Flex
      flexDir="row"
      flexWrap="wrap"
      gap="sm"
      p="md"
      rounded="md"
      bgColor="page.bg.initial"
      border="1px solid"
      borderColor="page.border.200"
    >
      <For each={activeFilters}>
        {(item) => (
          <Tag
            key={`${item.fieldName}.${item.fieldValue}`}
            size="sm"
            onClick={() => {}}
            palette="info"
          >
            {item.label}
          </Tag>
        )}
      </For>
    </Flex>
  );
}
