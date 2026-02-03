import { Button, type ButtonProps } from "@cerberus/react";
import { css } from "styled-system/css";

export type MenuBarButtonProps = ButtonProps & {
  icon: React.ReactNode;
  active?: boolean;
};

export function MenuBarButton(props: MenuBarButtonProps) {
  const { icon, active, ...buttonProps } = props;

  const styleActive = active
    ? css({
        bgColor: "action.ghost.active",
      })
    : undefined;

  return (
    <Button
      usage="ghost"
      p="xs"
      rounded="md"
      h="min-content"
      border="1px solid"
      borderColor="action.border.initial"
      className={styleActive}
      {...buttonProps}
      onClick={(ev) => {
        ev.preventDefault();
        if (!buttonProps.disabled) buttonProps.onClick?.(ev);
      }}
    >
      {icon}
    </Button>
  );
}
