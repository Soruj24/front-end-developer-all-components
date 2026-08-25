"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";
import { CustomSelect } from "./CustomSelect";
import type { SelectProps } from "./Select.types";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      placeholder,
      options,
      value,
      defaultValue,
      onChange,
      disabled = false,
      required = false,
      className,
      name,
      id,
    },
    ref,
  ) => {
    const uid = useId();
    const selectId = id ?? uid;

    return (
      <CustomSelect
        options={options.map((o) => ({ value: o.value, label: o.label, disabled: o.disabled }))}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        label={label}
        error={error}
        name={name}
        id={selectId}
        className={className}
      />
    );
  },
);
Select.displayName = "Select";
