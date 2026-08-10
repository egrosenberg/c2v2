import { IconButton, Input } from "@cerberus/react";
import type { TableSearchProps } from "../types";
import { Close, Filter, Search } from "@carbon/icons-react";
import { HStack } from "styled-system/jsx";

export function TableSearch({
  searchTerm,
  setSearchTerm,
  openFilter,
}: TableSearchProps) {
  return (
    <HStack>
      <HStack flex="1" position="relative" h="full" className="group">
        <Input
          position="relative"
          type="search"
          startIcon={<Search />}
          onChange={(ev) => setSearchTerm(ev.currentTarget.value)}
          value={searchTerm}
          size="sm"
        ></Input>
        <HStack
          h="full"
          pos="absolute"
          right="sm"
          top="0"
          opacity={{ base: "100", md: "0" }}
          _groupHover={{ opacity: "100" }}
          transition="all 0.2s"
        >
          <IconButton
            usage="ghost"
            size="sm"
            ariaLabel="clear search"
            onClick={() => setSearchTerm("")}
          >
            <Close />
          </IconButton>
        </HStack>
      </HStack>
      {openFilter && (
        <IconButton ariaLabel="filter table" onClick={openFilter}>
          <Filter />
        </IconButton>
      )}
    </HStack>
  );
}
