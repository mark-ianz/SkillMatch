import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Label from "./Label";
import { Textarea } from "@/components/ui/textarea";

type CommonProps = {
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  required?: boolean;
  optional?: boolean;
  as?: "input" | "textarea";
};

type InputWithLabelProps =
  | (CommonProps & React.InputHTMLAttributes<HTMLInputElement>)
  | (CommonProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>);

const InputWithLabel = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputWithLabelProps
>(
  (
    {
      label,
      id,
      containerClassName,
      labelClassName,
      inputClassName,
      required,
      optional,
      as = "input",
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-1", containerClassName)}>
        <Label
          id={id}
          className={labelClassName}
          required={required}
          optional={optional}
        >
          {label}
        </Label>
        {as === "textarea" ? (
          <Textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={cn(inputClassName)}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <Input
            id={id}
            ref={ref as React.Ref<HTMLInputElement>}
            className={cn(inputClassName)}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
