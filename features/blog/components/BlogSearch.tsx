import { cn } from "@/lib/cn";

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function BlogSearch({ value, onChange, className }: BlogSearchProps) {
  return (
    <div className={cn("relative w-full sm:w-72", className)}>
      <svg
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles..."
        className={cn(
          "w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm",
          "outline-none transition-colors",
          "placeholder:text-muted-foreground",
          "focus:border-primary focus:ring-1 focus:ring-primary"
        )}
      />
    </div>
  );
}
