import * as React from "react";
import { cn } from "@/lib/cn";
import type { InputOTPProps } from "./InputOTP.types";
import { INPUT_OTP_STYLES } from "./InputOTP.constants";

export function InputOTP({ length = 4, size = "md", variant = "numbers", label, error, className }: InputOTPProps) {
  const [values, setValues] = React.useState<string[]>(new Array(length).fill(""));
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (idx: number, val: string) => {
    const newValues = [...values];
    const filtered = variant === "numbers" ? val.replace(/\D/g, "") : val;
    newValues[idx] = filtered.slice(0, 1);
    setValues(newValues);

    if (filtered && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    } else if (!filtered && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className={cn(INPUT_OTP_STYLES.base, className)}>
      {label && <span className="text-sm font-medium">{label}</span>}
      {values.map((val, idx) => (
        <input
          key={idx}
          ref={(el) => { inputsRef.current[idx] = el; }}
          type="text"
          inputMode={variant === "numbers" ? "numeric" : "text"}
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className={cn(
            INPUT_OTP_STYLES.input,
            INPUT_OTP_STYLES[size],
            error && "border-red-500 focus:ring-red-500",
          )}
          aria-label={`Digit ${idx + 1}`}
        />
      ))}
    </div>
  );
}
