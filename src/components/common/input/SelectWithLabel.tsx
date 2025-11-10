import React from "react";
import Label from "./Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/utils";
import { cn } from "@/lib/utils";import { ItemList } from "./ComboBox";
;

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  fallbackValue?: string;
  items: ItemList[];
  containerClassName?: string;
  selectTriggerClassName?: string;
  selectContentClassName?: string;
  selectItemClassName?: string;
  disabled?: boolean;
  required?: boolean;
};

export default function SelectWithLabel({
  id,
  label,
  value,
  onChange,
  fallbackValue,
  items,
  containerClassName,
  selectTriggerClassName,
  selectContentClassName,
  selectItemClassName,
  disabled,
  required
}: Props) {
  return (
    <div className={cn(containerClassName)}>
      <Label id={id} required={required}>{capitalizeFirstLetter(label)}</Label>
      <Select
        defaultValue={value || fallbackValue || ""}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger id={id} className={cn("w-full", selectTriggerClassName)}>
          {capitalizeFirstLetter(value) || fallbackValue || "Select an option"}
        </SelectTrigger>
        <SelectContent align="start" className={selectContentClassName}>
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className={selectItemClassName}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
