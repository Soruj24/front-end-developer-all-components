import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/config/site";
import {
  RADIUS,
  BG,
  TRANSITION,
  TEXT,
} from "@/constants/tokens";

export function FooterBrand() {
  return (
    <div className="max-w-xs">
      <Link href="/" className="group inline-flex items-center gap-2.5">
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center font-bold text-background",
            RADIUS.lg,
            BG.primary,
            TEXT.small,
            `${TRANSITION.transform} group-hover:scale-105`,
          )}
        >
          {siteConfig.shortName}
        </span>
        <span className={cn("font-semibold tracking-tight text-foreground", TEXT.brand)}>
          {siteConfig.name}
        </span>
      </Link>
      <p className={cn("mt-4 leading-relaxed text-muted-foreground", TEXT.body)}>
        Build, customize and share production-ready components.
      </p>
    </div>
  );
}
