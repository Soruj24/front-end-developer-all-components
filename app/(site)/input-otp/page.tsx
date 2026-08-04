"use client";

import { Badge } from "@/components/design-system/Badge";
import { InputOTP } from "@/components/_input-otp";

export default function InputOTPPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">InputOTP</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="text-muted-foreground">OTP input with multiple boxes.</p>
      </header>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p>OTP input with multiple boxes.</p>
      </div>
    </div>
  );
}
