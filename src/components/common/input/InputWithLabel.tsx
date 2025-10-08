import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { twMerge } from "tailwind-merge";
import Label from "./Label";

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    { label, id, containerClassName, labelClassName, inputClassName, ...props },
    ref
  ) => {
    return (
      <div className={twMerge("flex flex-col gap-1", containerClassName)}>
        <Label id={id} className={labelClassName}>
          {label}
        </Label>
        <Input
          id={id}
          ref={ref}
          className={twMerge(inputClassName)}
          {...props}
        />
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
