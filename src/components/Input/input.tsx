"use client";

import { Flex } from "@/styled-system/jsx";
import { ComponentProps, PropsWithChildren } from "react";
import { cerberus } from "styled-system/jsx/factory";
import { v1 as uuid } from "uuid";

export type InputElementProps = ComponentProps<"input"> & {
  label?: string;
};

export function Input(props: InputElementProps) {
  const { label: labelText, ...inputProps } = props;

  const inputId = uuid();
  const labelId = uuid();

  return (
    <Flex flexDir="column" gap="sm">
      {labelText && (
        <cerberus.label css={{ textStyle: "label-sm" }} id={labelId}>
          {labelText}
        </cerberus.label>
      )}
      <cerberus.input
        {...inputProps}
        focusRingColor="action.ghost.hover"
        css={{
          backgroundColor: "page.surface.100",
          padding: "xs",
          px: "md",
          rounded: "sm",

          _hover: {
            backgroundColor: "page.surface.200",
            dropShadow: "0 0 10px black",
          },
          _focus: {
            backgroundColor: "page.surface.200",
            dropShadow: "0 0 10px black",
            outline: "none",
          },
        }}
        id={inputId}
        aria-labelledby={labelId}
      />
    </Flex>
  );
}
