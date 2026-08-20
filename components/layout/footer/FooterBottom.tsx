import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/config/site";
import { BORDER, STATUS_DOT, TEXT, COLOR, TRANSITION } from "@/constants/tokens";

export function FooterBottom() {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-3 border-t py-6 sm:flex-row",
        BORDER.default,
        TEXT.fine,
        COLOR.muted,
      )}
    >
      <p>
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/status"
          className={cn("flex items-center gap-1.5", TRANSITION.colors, "hover:text-foreground")}
        >
          <span className={STATUS_DOT.wrapper}>
            <span className={STATUS_DOT.ping} />
            <span className={STATUS_DOT.dot} />
          </span>
          Status
        </Link>
        <span className={COLOR.divider} aria-hidden="true">/</span>
        <span>v2.0</span>
        <span className={COLOR.divider} aria-hidden="true">/</span>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(TRANSITION.colors, "hover:text-foreground")}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
