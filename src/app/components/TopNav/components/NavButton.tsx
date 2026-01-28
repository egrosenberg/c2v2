"use client";

import { Button, ButtonProps, CerberusPrimitiveProps } from "@cerberus/react";

type NavButtonProps = CerberusPrimitiveProps<ButtonProps> & { text: string };

export function NavButton(props: NavButtonProps) {
  const { text, ...buttonProps } = props;
  return (
    <Button
      usage="ghost"
      shape="rounded"
      palette="action"
      textStyle="label-md"
      p="sm"
      px="md"
      rounded="sm"
      _hover={{
        color: "action.text.100",
        backgroundColor: "page.bg.initial",
      }}
      {...buttonProps}
    >
      {text}
    </Button>
  );
}
