"use client";
import {
  Button,
  For,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Text,
} from "@cerberus/react";
import Link from "next/link";
import type { UrlObject } from "url";

export type NavMenuItemProps = {
  label: string;
  icon?: React.ReactNode;
  onClick?: (...args: any) => any;
  href?: UrlObject | __next_route_internal_types__.RouteImpl<UrlObject>;
  value?: string;
};

export type NavManuProps = {
  label: string;
  items: NavMenuItemProps[];
};

export function NavMenuItem({
  label,
  icon,
  onClick,
  href,
  value,
}: NavMenuItemProps) {
  const Item = () => (
    <MenuItem value={value ?? label} onClick={onClick} p="sm" px="md">
      {icon ?? undefined}
      <Text ml="xs" textStyle="label-md">
        {label}
      </Text>
    </MenuItem>
  );

  if (href)
    return (
      <Link href={href}>
        <Item />
      </Link>
    );
  return <Item />;
}

export function NavMenu({ label, items }: NavManuProps) {
  return (
    <Menu>
      <MenuTrigger>
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
        >
          {label}
        </Button>
      </MenuTrigger>
      <MenuContent>
        <For each={items}>{(item, i) => <NavMenuItem key={i} {...item} />}</For>
      </MenuContent>
    </Menu>
  );
}
