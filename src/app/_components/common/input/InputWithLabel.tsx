import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <Input id={id} ref={ref} {...props}/>
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;