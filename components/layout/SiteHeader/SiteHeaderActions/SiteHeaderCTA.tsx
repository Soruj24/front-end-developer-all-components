"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/config/site";

interface SiteHeaderCTAProps {
  className?: string;
}

export function SiteHeaderCTA({ className }: SiteHeaderCTAProps) {
  return (
    <Link
      href={siteConfig.getStartedHref}
      className={cn(
        "hidden h-9 items-center rounded-full bg-foreground px-4",
        "text-[13px] font-medium text-background",
        "shadow-sm transition-all duration-200",
        "hover:shadow-md hover:opacity-90 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "lg:inline-flex",
        className
      )}
    >
      Get Started
    </Link>
  );
}
