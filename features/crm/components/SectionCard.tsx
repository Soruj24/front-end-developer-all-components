import { cn } from "@/lib/cn";

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ title, description, children, className }: SectionCardProps) {
  return (
    <div className={cn(
      "rounded-xl border border-border/60 bg-card p-6",
      "shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
      className,
    )}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}
