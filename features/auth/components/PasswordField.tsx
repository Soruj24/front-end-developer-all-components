"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon } from "./icons";

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  labelAction?: React.ReactNode;
}

export function PasswordField({
  id,
  name,
  label,
  error,
  autoComplete,
  placeholder,
  value,
  onChange,
  labelAction,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {labelAction}
      </div>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
          <LockIcon className="h-4 w-4" />
        </span>
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`h-10 w-full rounded-lg border border-input bg-background py-2 pl-10 pr-11 text-sm text-foreground placeholder:text-subtle transition-colors focus:outline-none focus:ring-1 ${
            error
              ? "border-danger focus:border-danger focus:ring-danger"
              : "border-input focus:border-ring focus:ring-ring"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        </button>
      </div>
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
