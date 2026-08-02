import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  id?: string;
  className?: string;
}

/** Consistent heading block used across landing sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className={cn(
          "text-foreground font-semibold tracking-tight",
          align === "center"
            ? "text-3xl sm:text-4xl lg:text-5xl"
            : "text-2xl sm:text-3xl lg:text-4xl",
          "text-balance"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-pretty text-muted-foreground",
            align === "center" ? "mx-auto" : "",
            "text-base sm:text-lg"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
