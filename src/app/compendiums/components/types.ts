import type { ControllerRenderProps, UseFormSetValue } from "react-hook-form";

export type RadioCheckCollectionItem = {
  value: string;
  label: string | React.ReactNode;
};
export type RadioCheckCollection = RadioCheckCollectionItem[];
export type RadioCheckSectionProps = {
  collection: RadioCheckCollection;
  setValue: UseFormSetValue<any>;
  label: string;
} & Omit<ControllerRenderProps, "ref">;
