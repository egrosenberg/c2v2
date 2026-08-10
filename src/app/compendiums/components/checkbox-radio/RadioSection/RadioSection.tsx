import { Reset } from "@carbon/icons-react";
import { IconButton, Radio, RadioGroup, Text } from "@cerberus/react";
import type {
  Control,
  ControllerRenderProps,
  UseFormSetValue,
} from "react-hook-form";
import { Flex } from "styled-system/jsx";
import type { RadioCheckSectionProps } from "../../types";

export function RadioSection({
  collection,
  setValue,
  label,
  ...field
}: RadioCheckSectionProps) {
  const reset = () => {
    setValue(field.name, undefined);
  };

  return (
    <Flex flexDir="column" gap="sm">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid"
        borderBottomColor="page.border.200"
      >
        <Text textStyle="heading-sm" fontVariantCaps="small-caps">
          {label}
        </Text>
        <IconButton
          ariaLabel={`reset-group: ${label}`}
          size="sm"
          onClick={reset}
        >
          <Reset />
        </IconButton>
      </Flex>
      <RadioGroup
        flexWrap="wrap"
        value={field.value ?? null}
        onValueChange={(details) => setValue(field.name, details.value)}
      >
        {collection.map((item) => (
          <Radio key={item.value} value={item.value}>
            {item.label}
          </Radio>
        ))}
      </RadioGroup>
    </Flex>
  );
}
