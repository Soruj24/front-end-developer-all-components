"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

interface SiteHeaderBrandProps {
  className?: string;
}

export function SiteHeaderBrand({ className }: SiteHeaderBrandProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex shrink-0 items-center gap-2.5",
        "transition-opacity hover:opacity-80",
        className
      )}
      aria-label={`${siteConfig.name} - Go to home`}
    >
      <span
        className={cn(
          "relative flex h-8 w-8 items-center justify-center",
          "rounded-lg bg-white",
          "text-[11px] font-bold text-black",
          "shadow-sm transition-transform duration-300",
          "group-hover:scale-105",
          "animate-logo-glow"
        )}
      >
        {siteConfig.shortName}
      </span>
      <span
        className={cn(
          "hidden text-[15px] font-semibold tracking-tight text-zinc-200",
          "sm:inline lg:hidden xl:inline",
          "transition-colors group-hover:text-white"
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
