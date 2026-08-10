"use client";

import { useQuery } from "@/api";
import { svcFindKeeperClasses } from "@/api/keeper-classes";
import {
  RollTable,
  type RollTableType,
} from "@/components/RollTable/RollTable";
import { MainContentWrapper } from "@/components/Wrappers/MainContentWrapper";
import { routeDefs } from "@/lib/routeDefs";
import { Virtue } from "@/styles";
import { CaretLeft, CaretRight } from "@carbon/icons-react";
import { IconButton, Text } from "@cerberus/react";
import { VIRTUES } from "@db/constants";
import { useParams, useRouter } from "next/navigation";
import type { PropsWithChildren, ReactElement, ReactNode } from "react";
import { css } from "styled-system/css";
import {
  Box,
  Flex,
  HStack,
  Scrollable,
  VStack,
  cerberus,
} from "styled-system/jsx";

const formattedVirtues: Record<(typeof VIRTUES)[number], string> = {
  cla: "CLArity",
  vig: "VIGor",
  spi: "SPIrit",
};

export function ClassPage() {
  const { keeperClassId } = useParams();
  const router = useRouter();

  const { data: classes, ready } = useQuery(svcFindKeeperClasses);
  const busy = !ready;

  const foundIndex =
    classes?.records.findIndex((kc) => kc.id === keeperClassId) ?? 0;
  const classIndex = (foundIndex || -1) < 0 ? 0 : foundIndex;
  const keeperClass = classes?.records[classIndex];

  const nextClass = () => {
    if (!classes?.total) return;
    const nextIndex = classIndex + 1 === classes?.total ? 0 : classIndex + 1;
    router.push(
      routeDefs.classPage({ keeperClassId: classes?.records[nextIndex]?.id }),
    );
  };

  const prevClass = () => {
    if (!classes?.total) return;
    const nextIndex = classIndex - 1 < 0 ? classes?.total - 1 : classIndex - 1;
    router.push(
      routeDefs.classPage({ keeperClassId: classes?.records[nextIndex]?.id }),
    );
  };

  return (
    <Flex
      flexDir="column"
      alignItems="stretch"
      h="full"
      maxH="full"
      position="relative"
    >
      <Scrollable
        flex="1"
        scrollbarGutter="stable"
        px="0.5rem"
        scrollbarColor="var(--cerberus-colors-action-bg-initial) transparent"
        scrollbarWidth="none"
        _hover={{
          pr: 0,
          scrollbarWidth: "thin",
        }}
        w="full"
      >
        <Flex
          flexDir="column"
          gap="lg"
          alignItems="center"
          w="full"
          aria-busy={busy}
        >
          <Box
            bg="page.surface.initial"
            position="sticky"
            top={0}
            mb="-lg"
            pb="sm"
            w="full"
          >
            <Box
              fontSize="4rem"
              fontFamily="uncial"
              textAlign="center"
              lineHeight="100%"
              color="page.text.initial"
              py="lg"
              borderBottom="1px solid"
              display="flex"
              flexDir="row"
              alignItems="center"
            >
              <IconButton
                ariaLabel="Previous Class"
                clipboard={undefined}
                onClick={nextClass}
              >
                <CaretLeft />
              </IconButton>
              <Text flex={1}>the {keeperClass?.name}</Text>
              <IconButton
                ariaLabel="Next Class"
                clipboard={undefined}
                onClick={prevClass}
              >
                <CaretRight />
              </IconButton>
            </Box>
          </Box>
          <Box
            maxH="calc(100vh - 26rem)"
            w="full"
            overflow="auto"
            scrollbarWidth="none"
          >
            <cerberus.img
              // src={`/img/classes/public/${keeperClass?.name.toLowerCase()}.webp`}
              src={`/img/classes/${keeperClass?.name.toLowerCase()}.webp`}
              objectFit="cover"
              objectPosition="top"
              w="full"
            />
          </Box>
          <Flex flexDir="row" w="full">
            <Flex flexDir="column" gap="lg" alignItems="center" flex="1">
              <Text textStyle="lg" textAlign="center">
                <em>{keeperClass?.tenets?.map((tenet) => `${tenet}. `)}</em>
              </Text>
              <Text textStyle="xl" textAlign="left" maxW="32rem">
                {keeperClass?.description}
              </Text>
              <Flex
                flexDir="column"
                gap="sm"
                alignItems="stretch"
                w="full"
                textStyle="body-lg"
              >
                <Text>
                  Virtue:{" "}
                  <Virtue>
                    {keeperClass?.virtue &&
                      formattedVirtues[keeperClass?.virtue]}
                  </Virtue>
                </Text>
                <Text>
                  Vitals: {keeperClass?.vitals?.hp}
                  <Virtue>hp</Virtue> // {keeperClass?.vitals?.gd}
                  <Virtue>gd</Virtue> // {keeperClass?.vitals?.wd}{" "}
                  <Virtue>wd</Virtue>
                </Text>
                <Text>
                  Subclasses (& Domains):
                  {keeperClass?.subclasses.map(
                    (subclass, i) =>
                      ` ${subclass.name} (${subclass.domain.name})` +
                      (i === keeperClass.subclasses.length - 1 ? "" : ","),
                  )}
                </Text>
                <Box>
                  <Text textStyle="heading-md" fontVariantCaps="small-caps">
                    You can always...
                  </Text>
                  <ul className={css({ listStyle: "inside" })}>
                    {keeperClass?.canAlways?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </Box>
              </Flex>
              {keeperClass?.startingWeapons && (
                <VStack w={{ base: "full", md: "3/4" }}>
                  <RollTable table={keeperClass.startingWeapons} />
                </VStack>
              )}
              {keeperClass?.startingArmor && (
                <VStack w={{ base: "full", md: "3/4" }}>
                  <RollTable table={keeperClass.startingArmor} />
                </VStack>
              )}
              {keeperClass?.startingBelongings && (
                <VStack w={{ base: "full", md: "3/4" }}>
                  <RollTable table={keeperClass.startingBelongings} />
                </VStack>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Scrollable>
    </Flex>
  );
}
