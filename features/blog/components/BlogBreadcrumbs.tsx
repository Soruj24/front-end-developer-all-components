import Link from "next/link";
import { cn } from "@/lib/cn";

interface BlogBreadcrumbItem {
  label: string;
  href?: string;
}

interface BlogBreadcrumbsProps {
  items: BlogBreadcrumbItem[];
  className?: string;
}

export function BlogBreadcrumbs({ items, className }: BlogBreadcrumbsProps) {
  return (
    <nav
      className={cn("flex items-center gap-1.5 text-sm", className)}
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg
              className="h-3.5 w-3.5 text-muted-foreground/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
