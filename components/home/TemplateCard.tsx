import { cn } from "@/lib/cn";

interface TemplateCardProps {
  title: string;
  description: string;
  category: string;
  pages: number;
  components: number;
  image?: string;
  href: string;
  className?: string;
}

export function TemplateCard({ title, description, category, pages, components, href, className }: TemplateCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group flex flex-col rounded-lg border border-border/60 bg-background transition-all duration-200",
        "hover:border-ring/40 hover:shadow-sm",
        className,
      )}
    >
      <div className="flex h-44 items-center justify-center overflow-hidden border-b border-border/40 bg-muted/20">
        <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
          </svg>
          <span className="text-xs font-medium">{category}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">{description}</p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-[10px] text-muted-foreground">
          <span>{pages} pages</span>
          <span className="text-border">/</span>
          <span>{components} components</span>
        </div>
      </div>
    </a>
  );
}
