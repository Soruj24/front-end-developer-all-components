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
        "hidden h-9 items-center rounded-full bg-white px-4",
        "text-[13px] font-medium text-black",
        "shadow-sm transition-all duration-200",
        "hover:shadow-md hover:bg-zinc-100 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "lg:inline-flex",
        className
      )}
    >
      Get Started
    </Link>
  );
}
