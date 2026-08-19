"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { InputOTP } from "@/components/ui/InputOTP";

const INPUTOTP_SOURCE = `"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/cn";

interface InputOTPProps {
  length?: number;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function InputOTP({ length = 6, value = "", onValueChange, className }: InputOTPProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback(
    (index: number, digit: string) => {
      if (!/^\\d*$/.test(digit)) return;
      const chars = value.split("");
      chars[index] = digit;
      const next = chars.join("").slice(0, length);
      onValueChange?.(next);
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [value, length, onValueChange],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [value],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\\D/g, "").slice(0, length);
      onValueChange?.(pasted);
      const focusIndex = Math.min(pasted.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    },
    [length, onValueChange],
  );

  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            "h-10 w-10 rounded-md border bg-white text-center text-lg font-medium",
            "dark:bg-zinc-900 dark:border-zinc-700",
            "focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none",
          )}
        />
      ))}
    </div>
  );
}`;

const FOUR_DIGIT_SOURCE = `import { useState } from "react";
import { InputOTP } from "@/components/ui/InputOTP";

function FourDigitOTP() {
  const [value, setValue] = useState("");
  return <InputOTP length={4} value={value} onValueChange={setValue} />;
}`;

const SIX_DIGIT_SOURCE = `import { useState } from "react";
import { InputOTP } from "@/components/ui/InputOTP";

function SixDigitOTP() {
  const [value, setValue] = useState("");
  return <InputOTP length={6} value={value} onValueChange={setValue} />;
}`;

const EIGHT_DIGIT_SOURCE = `import { useState } from "react";
import { InputOTP } from "@/components/ui/InputOTP";

function EightDigitOTP() {
  const [value, setValue] = useState("");
  return <InputOTP length={8} value={value} onValueChange={setValue} />;
}`;

export default function InputOTPPage() {
  const [value4, setValue4] = useState("");
  const [value6, setValue6] = useState("");

  return (
    <ComponentDocPage
      name="Input OTP"
      category="Forms"
      description="One-time password input with separate character boxes. Ideal for verification codes, PINs, and security tokens."
    >
      <PreviewPanel filename="input-otp-preview.tsx">
        <InputOTP length={6} value={value6} onValueChange={setValue6} />
      </PreviewPanel>

      <SourceCodeViewer
        source={INPUTOTP_SOURCE}
        filename="components/ui/InputOTP/InputOTP.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="4-digit OTP"
          description="Simple 4-digit verification code."
          code={FOUR_DIGIT_SOURCE}
          filename="four-digit.tsx"
        >
          <InputOTP length={4} value={value4} onValueChange={setValue4} />
        </ExampleBlock>

        <ExampleBlock
          title="6-digit OTP"
          description="Standard 6-digit verification code."
          code={SIX_DIGIT_SOURCE}
          filename="six-digit.tsx"
        >
          <InputOTP length={6} value={value6} onValueChange={setValue6} />
        </ExampleBlock>

        <ExampleBlock
          title="8-digit OTP"
          description="Extended 8-digit verification code."
          code={EIGHT_DIGIT_SOURCE}
          filename="eight-digit.tsx"
        >
          <InputOTP length={8} value={value4} onValueChange={setValue4} />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
