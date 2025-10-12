import React from "react";
import Label from "./Label";
import Combobox from "./ComboBox";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label: string;
  searchFor: string;
  value: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
  disabled?: boolean;
  containerClassName?: string;
  readonly?: boolean;
  required?: boolean;
};

export default function ComboBoxWithLabel({
  id,
  label,
  searchFor,
  value,
  items,
  onValueChange,
  disabled,
  readonly,
  containerClassName,
  required
}: Props) {
  return (
    <div className={cn("flex flex-col gap-1", containerClassName)}>
      <Label required={required} id={id}>{label}</Label>
      <Combobox
        disabled={disabled}
        items={items}
        searchFor={searchFor}
        value={value}
        onValueChange={onValueChange}
        readonly={readonly}
      />
    </div>
  );
}
