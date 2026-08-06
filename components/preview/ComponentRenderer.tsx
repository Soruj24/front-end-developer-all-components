"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ComponentRendererProps {
  children: ReactNode;
  className?: string;
}

export function ComponentRenderer({
  children,
  className,
}: ComponentRendererProps) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
