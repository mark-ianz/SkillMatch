import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";;
import Label from "./Label";

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  required?: boolean;
}

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    { label, id, containerClassName, labelClassName, inputClassName, required, ...props },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-1", containerClassName)}>
        <Label id={id} className={labelClassName} required={required}>
          {label}
        </Label>
        <Input
          id={id}
          ref={ref}
          className={cn(inputClassName)}
          {...props}
        />
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
