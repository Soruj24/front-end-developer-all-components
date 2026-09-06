import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import type { TemplateEntry } from "../templates-data";

export function TemplateGalleryCard({ template }: { template: TemplateEntry }) {
  return (
    <Link
      href={template.href}
      aria-label={`${template.title} — live preview. ${template.description}`}
      className={cn(
        "group flex min-w-0 flex-col rounded-lg border border-border/60 bg-background transition-colors duration-200 hover:border-ring/40 hover:shadow-sm",
        FOCUS.ring,
      )}
    >
      <div className="flex h-44 items-center justify-center overflow-hidden border-b border-border/40 bg-muted/20 px-4">
        <div className="flex min-w-0 flex-col items-center gap-2 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/70">
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          <span className="max-w-full truncate text-xs font-medium">{template.category}</span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <h3 className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
            {template.title}
          </h3>
          <svg
            className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {template.description}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-2 text-[10px] text-muted-foreground">
          <span className="rounded-md bg-muted/60 px-1.5 py-0.5 font-medium">
            {template.category}
          </span>
          <span>{template.pages} pages</span>
          <span className="text-border" aria-hidden="true">/</span>
          <span>{template.components} components</span>
        </div>
      </div>
    </Link>
  );
}
