import Link from "next/link";
import { siteConfig } from "@/config/site";

export function FooterBottom() {
  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-border/60 py-6 text-[12px] text-muted-foreground sm:flex-row">
      <p>
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/status"
          className="flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Status
        </Link>
        <span className="text-border" aria-hidden="true">/</span>
        <span>v2.0</span>
        <span className="text-border" aria-hidden="true">/</span>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
