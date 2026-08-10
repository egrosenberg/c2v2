"use client";

import { useQuery } from "@/api";
import { svcFindSkillsAggregates } from "@/api/skills";
import { CheckboxSection } from "@/compendiums/components/checkbox-radio/CheckboxSection/CheckboxSection";
import type { RadioCheckCollection } from "@/compendiums/components/types";
import {
  Button,
  Dialog,
  DialogCloseTrigger,
  DialogProvider,
} from "@cerberus/react";
import type { FindSkillsAggregates } from "@db/services/skills/find-skills-aggregates";
import type { SkillsFilter } from "@db/services/skills/types";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Flex, Scrollable, VStack } from "styled-system/jsx";
import { _refine } from "zod/v4/core";

export type SkillsFilterProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: SubmitHandler<SkillsFilter>;
  defaultValues?: SkillsFilter;
  aggregates: FindSkillsAggregates | undefined;
};

export function SkillsFilterDialog({
  open,
  setOpen,
  onSubmit,
  defaultValues,
  aggregates,
}: SkillsFilterProps) {
  const { control, handleSubmit, setValue, reset } = useForm<SkillsFilter>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const sourceTypesCollection: RadioCheckCollection = [
    "aspect",
    "subclass",
    "domain",
  ].map((source) => ({
    value: source,
    label: source.at(0)?.toUpperCase() + source.slice(1),
  }));

  const actionsCollection: RadioCheckCollection =
    aggregates?.actions.map((value) => ({
      label: value,
      value: String(value),
    })) ?? [];

  const focusCollection: RadioCheckCollection =
    aggregates?.focus.map((value) => ({
      label: value,
      value: String(value),
    })) ?? [];

  const sourceNamesCollection: RadioCheckCollection =
    aggregates?.sources.map((value) => ({
      label: value.name,
      value: value.id,
    })) ?? [];

  const typesCollection: RadioCheckCollection =
    aggregates?.types.map((value) => ({
      label: value,
      value: value,
    })) ?? [];

  const subtypesCollection: RadioCheckCollection =
    aggregates?.subtypes.map((value) => ({
      label: value,
      value: value,
    })) ?? [];

  return (
    <DialogProvider
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Dialog size="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            flexDir="column"
            gap="md"
            maxH="80vh"
            overflowY="auto"
            scrollbarWidth="thin"
            px="sm"
          >
            <Controller
              control={control}
              name="actions"
              render={({ field: { ref: _ref, ...field } }) => (
                <CheckboxSection
                  {...field}
                  collection={actionsCollection}
                  setValue={setValue}
                  label="Actions"
                />
              )}
            />
            <Controller
              control={control}
              name="focus"
              render={({ field: { ref: _ref, ...field } }) => (
                <CheckboxSection
                  {...field}
                  collection={focusCollection}
                  setValue={setValue}
                  label="Focus"
                />
              )}
            />
            <Controller
              control={control}
              name="type"
              render={({ field: { ref: _ref, ...field } }) => (
                <CheckboxSection
                  label="Skill Type"
                  {...field}
                  collection={typesCollection}
                  setValue={setValue}
                />
              )}
            />
            <Controller
              control={control}
              name="subtype"
              render={({ field: { ref: _ref, ...field } }) => (
                <CheckboxSection
                  label="Skill Subtype"
                  {...field}
                  collection={subtypesCollection}
                  setValue={setValue}
                />
              )}
            />
            <Controller
              control={control}
              name="sourceType"
              render={({ field: { ref: _ref, ...field } }) => (
                <CheckboxSection
                  label="Source Type"
                  {...field}
                  collection={sourceTypesCollection}
                  setValue={setValue}
                />
              )}
            />
            <Controller
              control={control}
              name="sourceId"
              render={({ field: { ref: _ref, ...field } }) => (
                <CheckboxSection
                  label="Source Name"
                  {...field}
                  collection={sourceNamesCollection}
                  setValue={setValue}
                />
              )}
            />
          </Flex>
          <VStack
            position="sticky"
            bottom="0"
            m="0"
            p="sm"
            bgColor="page.surface.100"
          >
            <DialogCloseTrigger asChild>
              <Button shape="rounded" type="submit">
                Save
              </Button>
            </DialogCloseTrigger>
          </VStack>
        </form>
      </Dialog>
    </DialogProvider>
  );
}
