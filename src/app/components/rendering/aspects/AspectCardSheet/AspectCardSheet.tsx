import { Flex, Grid } from "styled-system/jsx";
import { pageCss } from "../../types";
import { For } from "@cerberus/react";
import type { Ref } from "react";
import type { AspectWithRelations } from "@db/tables/aspects";
import AspectCard from "../AspectCard/AspectCard";

export default function AspectCardSheet({
  aspects,
  ref,
}: {
  aspects: AspectWithRelations[];
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <Flex
      className={pageCss}
      position="relative"
      alignItems="center"
      justifyContent="center"
      ref={ref}
      bgColor="white"
    >
      <Grid
        gridTemplateColumns="repeat(3, 1fr)"
        borderCollapse="collapse"
        gridGap="0"
      >
        <For each={aspects}>
          {(aspect, index) => (
            <AspectCard aspect={aspect} key={index}></AspectCard>
          )}
        </For>
      </Grid>
    </Flex>
  );
}
