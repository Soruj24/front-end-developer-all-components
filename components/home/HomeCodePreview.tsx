import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { CodeBlock } from "./CodeBlock";
import { ArrowUpRightIcon, CheckIcon } from "./icons";

const buttonSource = `import { cn } from "@/lib/cn";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        "transition-colors focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-foreground text-background hover:opacity-90",
        variant === "secondary" && "border border-border bg-background hover:bg-muted",
        variant === "ghost" && "hover:bg-muted",
        size === "sm" && "h-8 px-3 text-xs",
        size === "md" && "h-10 px-5 text-sm",
        className
      )}
      {...props}
    />
  );
}`;

const highlights = [
  "First-class TypeScript props with sensible defaults",
  "Variants driven by a single design-token system",
  "Focus rings and reduced-motion handling included",
];

function LivePreview() {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-border bg-muted/30 px-4 py-5">
      <span className="inline-flex h-9 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background shadow-sm">
        Get started
      </span>
      <span className="inline-flex h-9 items-center rounded-full border border-border bg-background px-4 text-sm font-medium">
        Secondary
      </span>
      <span className="inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        Ghost
      </span>
      <span
        className="inline-flex h-9 items-center rounded-full border border-border bg-background px-4 text-sm font-medium outline outline-2 outline-offset-2 outline-accent/40"
        aria-hidden="true"
      >
        Focused
      </span>
    </div>
  );
}

/** Split section pairing editorial copy with a live code preview. */
export function HomeCodePreview() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20" aria-label="Code preview">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <Reveal>
          <div className="flex flex-col gap-5">
            <SectionHeading
              align="left"
              eyebrow="Code preview"
              title="Readable code you actually own"
              description="No black box. Every component is a plain file you can open, understand, and modify."
            />
            <ul className="flex flex-col gap-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/buttons"
              className="group mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              See it in the library
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-xl border border-border bg-background shadow-card">
            <LivePreview />
            <CodeBlock code={buttonSource} filename="components/ui/button.tsx" label="tsx" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
