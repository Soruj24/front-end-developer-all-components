"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { Search, Settings, LogOut, Sun, Moon, Star } from "lucide-react";

interface HeaderLogoProps {
  className?: string;
  showVersion?: boolean;
  version?: string;
}

export function HeaderLogo({ className, showVersion = true, version = "v2.0" }: HeaderLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2",
        "hover:opacity-80 transition-opacity",
        className
      )}
      aria-label="Home"
    >
      <span
        className={cn(
          "relative h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center",
          "text-primary",
          "shadow-sm transition-transform hover:scale-105"
        )}
      >
        <Star className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium tracking-tight text-foreground">
        Component Registry
      </span>
      {showVersion && (
        <span
          className={cn(
            "ml-1 text-[10px] text-muted-foreground",
            "opacity-80"
          )}
        >
          {version}
        </span>
      )}
    </Link>
  );
}