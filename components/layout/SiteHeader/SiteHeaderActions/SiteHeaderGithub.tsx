"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { GithubIcon } from "../icons";
import { siteConfig } from "@/config/site";

interface SiteHeaderGithubProps {
  className?: string;
}

export function SiteHeaderGithub({ className }: SiteHeaderGithubProps) {
  return (
    <Link
      href={siteConfig.github}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "hidden h-9 w-9 items-center justify-center rounded-full",
        "text-zinc-400 transition-all duration-200",
        "hover:bg-zinc-800/60 hover:text-zinc-200 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500",
        "sm:flex",
        className
      )}
      aria-label="GitHub repository"
    >
      <GithubIcon className="h-[17px] w-[17px]" />
    </Link>
  );
}
