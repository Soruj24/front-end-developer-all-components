import Link from "next/link";
import { siteConfig } from "@/config/site";

export function FooterBrand() {
  return (
    <div className="max-w-xs">
      <Link href="/" className="group inline-flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-[11px] font-bold text-background transition-transform group-hover:scale-105">
          {siteConfig.shortName}
        </span>
        <span className="text-sm font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </span>
      </Link>
      <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
        Build, customize and share production-ready components.
      </p>
    </div>
  );
}
