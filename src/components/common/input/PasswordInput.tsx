"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Label from "@/components/common/input/Label";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  id?: string;
  label?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  ariaLabel?: string;
  required?: boolean;
};

export default function PasswordInput({
  id = "password",
  label,
  value,
  onChange,
  autoComplete = "new-password",
  ariaLabel,
  required = false,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {label ? <Label id={id} required={required}>{label}</Label> : null}
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          aria-label={ariaLabel ?? (show ? "Hide password" : "Show password")}
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
