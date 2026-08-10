import { ChevronDown, Reset } from "@carbon/icons-react";
import {
  Collapsible,
  Checkbox,
  CheckboxGroup,
  IconButton,
  Text,
  Button,
} from "@cerberus/react";
import { Box, Flex, HStack } from "styled-system/jsx";
import type { RadioCheckSectionProps } from "../../types";
import { useState } from "react";
import { index } from "drizzle-orm/gel-core";
import { css } from "styled-system/css";

export function CheckboxSection({
  collection,
  setValue,
  label,
  ...field
}: RadioCheckSectionProps) {
  const fieldValue = (field.value || []) as string[];

  const reset = () => {
    setValue(field.name, []);
  };

  const onCheckedChange = (
    value: unknown,
    details: { checked: boolean | string },
  ) => {
    const newValues = [...fieldValue];
    if (details.checked) {
      const index = newValues.findIndex((val) => val === value);
      if (index !== -1) {
        newValues.splice(index, 1);
      }
    } else {
      newValues.push(value as string);
    }
    setValue(field.name, newValues);
  };

  return (
    <Flex display="flex" flexDir="column" gap="sm">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid"
        borderBottomColor="page.border.200"
      >
        <Text textStyle="heading-sm" fontVariantCaps="small-caps">
          {label}
        </Text>
        <HStack h="full" alignItems="stretch">
          <IconButton
            ariaLabel={`reset-group: ${label}`}
            size="sm"
            onClick={reset}
          >
            <Reset />
          </IconButton>
        </HStack>
      </Flex>
      <CheckboxGroup
        flexDir="row"
        flexWrap="wrap"
        gap="sm"
        value={fieldValue}
        onValueChange={(details) => setValue(field.name, details)}
      >
        {collection.map((item) => (
          <Box
            key={item.value}
            py="xs"
            px="sm"
            border="1px solid"
            borderColor="page.border.200"
            rounded="md"
            display="flex"
            alignItems="center"
            color="action.text.initial"
            className={
              fieldValue.includes(item.value)
                ? css({ bgColor: "action.ghost.hover" })
                : css({ bgColor: "action.ghost.initial" })
            }
          >
            <Checkbox
              value={item.value}
              checked={fieldValue.includes(item.value)}
              onCheckedChange={(details) =>
                onCheckedChange(item.value, details)
              }
            >
              <Text as="span" fontFamily="ibm">
                {item.label}
              </Text>
            </Checkbox>
          </Box>
        ))}
      </CheckboxGroup>
    </Flex>
  );
}
