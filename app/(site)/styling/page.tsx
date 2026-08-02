"use client";

import { useEffect, useState } from "react";
import { DocsLayout } from "@/components/docs";
import { Alert, Badge, Button, Card } from "@/components/ui";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Live token values                                                   */
/* ------------------------------------------------------------------ */

const ALL_TOKEN_VARS = [
  "--background",
  "--foreground",
  "--surface",
  "--muted",
  "--muted-foreground",
  "--subtle",
  "--border",
  "--input",
  "--ring",
  "--primary",
  "--primary-foreground",
  "--primary-soft",
  "--secondary",
  "--secondary-foreground",
  "--success",
  "--success-foreground",
  "--success-soft",
  "--warning",
  "--warning-foreground",
  "--warning-soft",
  "--danger",
  "--danger-foreground",
  "--danger-soft",
  "--info",
  "--info-foreground",
  "--info-soft",
] as const;

function useResolvedTokenValues() {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    let observer: MutationObserver | null = null;
    const read = () => {
      const cs = getComputedStyle(document.documentElement);
      const map: Record<string, string> = {};
      for (const v of ALL_TOKEN_VARS) map[v] = cs.getPropertyValue(v).trim();
      setValues(map);
    };
    const raf = requestAnimationFrame(() => {
      read();
      observer = new MutationObserver(() => read());
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  return values;
}

/* ------------------------------------------------------------------ */
/* Swatch helpers                                                      */
/* ------------------------------------------------------------------ */

function TokenSwatch({
  cssVar,
  usage,
  values,
}: {
  cssVar: string;
  usage: string;
  values: Record<string, string>;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface">
      <div
        className="flex h-16 items-end justify-end p-2"
        style={{ backgroundColor: `var(${cssVar})` }}
      >
        <span className="rounded border border-border bg-background/80 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground backdrop-blur">
          var
        </span>
      </div>
      <div className="flex flex-col gap-0.5 border-t border-border p-2.5">
        <span className="font-mono text-xs font-medium text-foreground">
          {usage}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {cssVar}
        </span>
        <span
          className="line-clamp-1 font-mono text-[10px] text-subtle"
          title={values[cssVar] ?? ""}
        >
          {values[cssVar] || "resolving…"}
        </span>
      </div>
    </div>
  );
}

function SwatchGrid({
  children,
  cols = "sm:grid-cols-3",
}: {
  children: React.ReactNode;
  cols?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 lg:grid-cols-4", cols)}>
      {children}
    </div>
  );
}

function SectionHeading({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {children}
      </h2>
      {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Token scales                                                        */
/* ------------------------------------------------------------------ */

const SPACING = [
  { token: "--space-1", width: "var(--space-1)", usage: "gap-1", px: "4px" },
  { token: "--space-2", width: "var(--space-2)", usage: "gap-2", px: "8px" },
  { token: "--space-3", width: "var(--space-3)", usage: "gap-3", px: "12px" },
  { token: "--space-4", width: "var(--space-4)", usage: "gap-4", px: "16px" },
  { token: "--space-5", width: "var(--space-5)", usage: "gap-5", px: "20px" },
  { token: "--space-6", width: "var(--space-6)", usage: "gap-6", px: "24px" },
  { token: "--space-8", width: "var(--space-8)", usage: "gap-8", px: "32px" },
  { token: "--space-10", width: "var(--space-10)", usage: "gap-10", px: "40px" },
  { token: "--space-12", width: "var(--space-12)", usage: "gap-12", px: "48px" },
  { token: "--space-16", width: "var(--space-16)", usage: "gap-16", px: "64px" },
];

const RADII = [
  { token: "--radius-xs", cls: "rounded-xs", px: "2px" },
  { token: "--radius-sm", cls: "rounded-sm", px: "6px" },
  { token: "--radius-md", cls: "rounded-md", px: "8px" },
  { token: "--radius-lg", cls: "rounded-lg", px: "12px" },
  { token: "--radius-xl", cls: "rounded-xl", px: "16px" },
  { token: "--radius-2xl", cls: "rounded-2xl", px: "20px" },
  { token: "--radius-3xl", cls: "rounded-3xl", px: "24px" },
  { token: "--radius-4xl", cls: "rounded-4xl", px: "32px" },
  { token: "--radius-full", cls: "rounded-full", px: "∞" },
];

const SHADOWS = [
  { token: "--shadow-xs", cls: "shadow-xs" },
  { token: "--shadow-sm", cls: "shadow-sm" },
  { token: "--shadow-md", cls: "shadow-md" },
  { token: "--shadow-lg", cls: "shadow-lg" },
  { token: "--shadow-xl", cls: "shadow-xl" },
  { token: "--shadow-2xl", cls: "shadow-2xl" },
  { token: "--shadow-card", cls: "shadow-card" },
  { token: "--shadow-popover", cls: "shadow-popover" },
  { token: "--shadow-modal", cls: "shadow-modal" },
  { token: "--shadow-toast", cls: "shadow-toast" },
];

const DURATIONS = [
  { token: "--duration-fast", value: "150ms" },
  { token: "--duration-base", value: "200ms" },
  { token: "--duration-slow", value: "400ms" },
];

const EASINGS = [
  { token: "--ease-standard", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
  { token: "--ease-in", value: "cubic-bezier(0.4, 0, 1, 1)" },
  { token: "--ease-out", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
  { token: "--ease-in-out", value: "cubic-bezier(0.65, 0, 0.35, 1)" },
  { token: "--ease-spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
];

const ANIMATIONS = [
  { name: "fade-in", cls: "animate-fade-in" },
  { name: "fade-in-up", cls: "animate-fade-in-up" },
  { name: "fade-in-down", cls: "animate-fade-in-down" },
  { name: "fade-slide", cls: "animate-fade-slide" },
  { name: "scale-in", cls: "animate-scale-in" },
  { name: "pop", cls: "animate-pop" },
  { name: "slide-in-up", cls: "animate-slide-in-up" },
  { name: "slide-in-down", cls: "animate-slide-in-down" },
  { name: "slide-in-left", cls: "animate-slide-in-left" },
  { name: "slide-in-right", cls: "animate-slide-in-right" },
  { name: "shimmer", cls: "animate-shimmer" },
  { name: "pulse-ring", cls: "animate-pulse-ring" },
];

const TYPOGRAPHY_SIZES = [
  { cls: "text-xs", label: "xs" },
  { cls: "text-sm", label: "sm" },
  { cls: "text-base", label: "base" },
  { cls: "text-lg", label: "lg" },
  { cls: "text-xl", label: "xl" },
  { cls: "text-2xl", label: "2xl" },
  { cls: "text-3xl", label: "3xl" },
  { cls: "text-4xl", label: "4xl" },
];

const TYPOGRAPHY_WEIGHTS = [
  { cls: "font-normal", label: "Regular" },
  { cls: "font-medium", label: "Medium" },
  { cls: "font-semibold", label: "Semibold" },
  { cls: "font-bold", label: "Bold" },
];

/* ------------------------------------------------------------------ */
/* Animation lab                                                       */
/* ------------------------------------------------------------------ */

function AnimationLab() {
  const [active, setActive] = useState<string | null>(null);
  const [seq, setSeq] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {ANIMATIONS.map((anim) => (
          <button
            key={anim.name}
            type="button"
            onClick={() => {
              setActive(anim.cls);
              setSeq((s) => s + 1);
            }}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-xs font-medium transition-colors",
              active === anim.cls
                ? "border-primary/60 bg-primary-soft text-primary"
                : "border-border text-muted-foreground hover:border-ring/50 hover:text-foreground"
            )}
          >
            {anim.name}
          </button>
        ))}
      </div>
      <div className="flex h-44 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
        {active === null ? (
          <p className="text-sm text-muted-foreground">
            Select an animation token to preview it
          </p>
        ) : active === "animate-shimmer" ? (
          <div
            key={seq}
            className="animate-shimmer h-20 w-56 rounded-xl border border-border bg-[linear-gradient(90deg,var(--muted)_25%,var(--surface)_50%,var(--muted)_75%)] [background-size:200%_100%]"
          />
        ) : (
          <div
            key={seq}
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-2xl text-primary-foreground shadow-card",
              active
            )}
          >
            ✦
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Tokens map to utilities:{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground">
          animate-pop
        </code>{" "}
        ={" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground">
          pop 200ms var(--ease-spring) both
        </code>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tokens in practice                                                  */
/* ------------------------------------------------------------------ */

function PracticeDemo() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Buttons
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <p className="text-xs text-muted-foreground">
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
            bg-primary / bg-secondary / bg-danger
          </code>{" "}
          with matching foreground tokens.
        </p>
      </Card>

      <Card className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Badges
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge dot variant="success">
            Live
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Status badges layer{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
            bg-{"{status}"}-soft
          </code>{" "}
          over{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
            text-{"{status}"}
          </code>
          .
        </p>
      </Card>

      <Card className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Alerts
        </h3>
        <Alert variant="info">Info — use these tokens for neutral guidance.</Alert>
        <Alert variant="success">Success — confirmation and positive states.</Alert>
        <Alert variant="warning">Warning — something needs attention.</Alert>
        <Alert variant="error">Error — destructive or blocking states.</Alert>
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-foreground">Token sample card</p>
            <p className="text-sm text-muted-foreground">
              Card surfaces use{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                bg-surface
              </code>{" "}
              with a{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                shadow-card
              </code>
              , text uses the typography color tokens, and the focus ring is
              always{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                ring-ring
              </code>
              .
            </p>
          </div>
          <Badge variant="primary" dot>
            System
          </Badge>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
          <span className="text-sm text-muted-foreground">
            Status — all green means all tokens resolved
          </span>
          <span className="flex h-2 w-2 rounded-full bg-success" />
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">Take action</Button>
          <Button size="sm" variant="outline">
            Dismiss
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function StylingPage() {
  const values = useResolvedTokenValues();

  return (
    <DocsLayout
      title="Design Tokens"
      description="The semantic token system that drives every component — colors, typography, spacing, radius, shadows, and motion. All values resolve live and flip with dark mode."
      contentClassName="flex flex-col gap-14"
    >
      {/* Overview */}
      <section className="flex flex-col gap-3">
        <SectionHeading hint="A single source of truth, consumed by every component.">
          Token architecture
        </SectionHeading>
        <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="font-medium text-foreground">Semantic, not positional</p>
            <p className="mt-1">
              Tokens describe meaning — <code className="font-mono text-xs">primary</code>,{" "}
              <code className="font-mono text-xs">danger</code>,{" "}
              <code className="font-mono text-xs">surface</code> — never a fixed hue. Swap the
              palette without touching components.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="font-medium text-foreground">Theme-aware by default</p>
            <p className="mt-1">
              Every token resolves from <code className="font-mono text-xs">:root</code> and{" "}
              <code className="font-mono text-xs">.dark</code>. A single utility like{" "}
              <code className="font-mono text-xs">bg-surface</code> adapts automatically.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="font-medium text-foreground">Derived scales</p>
            <p className="mt-1">
              Radius grows from a shared base, shadows share a tinted{" "}
              <code className="font-mono text-xs">--shadow-color</code>, motion uses named
              durations and easings.
            </p>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="flex flex-col gap-5">
        <SectionHeading hint="Colors are oklch. Neutrals keep zero chroma; the brand and status hues form one consistent family.">
          Color tokens
        </SectionHeading>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Surface &amp; typography
          </h3>
          <SwatchGrid>
            <TokenSwatch cssVar="--background" usage="bg-background" values={values} />
            <TokenSwatch cssVar="--surface" usage="bg-surface" values={values} />
            <TokenSwatch cssVar="--muted" usage="bg-muted" values={values} />
            <TokenSwatch cssVar="--foreground" usage="text-foreground" values={values} />
            <TokenSwatch cssVar="--muted-foreground" usage="text-muted-foreground" values={values} />
            <TokenSwatch cssVar="--subtle" usage="text-subtle" values={values} />
          </SwatchGrid>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Lines &amp; focus ring
          </h3>
          <SwatchGrid>
            <TokenSwatch cssVar="--border" usage="border-border" values={values} />
            <TokenSwatch cssVar="--input" usage="border-input" values={values} />
            <TokenSwatch cssVar="--ring" usage="ring-ring" values={values} />
            <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center text-xs text-muted-foreground">
              Focus uses <code className="font-mono">ring-ring</code> — 2px, offset by the
              background.
            </div>
          </SwatchGrid>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Brand — primary
          </h3>
          <SwatchGrid>
            <TokenSwatch cssVar="--primary" usage="bg-primary" values={values} />
            <TokenSwatch cssVar="--primary-foreground" usage="text-primary-foreground" values={values} />
            <TokenSwatch cssVar="--primary-soft" usage="bg-primary-soft" values={values} />
            <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center text-xs text-muted-foreground">
              <code className="font-mono">accent</code>,{" "}
              <code className="font-mono">accent-soft</code> and{" "}
              <code className="font-mono">accent-foreground</code> are legacy aliases of
              primary.
            </div>
          </SwatchGrid>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Secondary
          </h3>
          <SwatchGrid cols="sm:grid-cols-2">
            <TokenSwatch cssVar="--secondary" usage="bg-secondary" values={values} />
            <TokenSwatch cssVar="--secondary-foreground" usage="text-secondary-foreground" values={values} />
          </SwatchGrid>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Status
          </h3>
          {(
            [
              ["success", "Success"],
              ["warning", "Warning"],
              ["danger", "Danger"],
              ["info", "Info"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className={cn("h-2.5 w-2.5 rounded-full", `bg-${key}`)} />
                <span className="text-xs font-medium text-foreground">{label}</span>
              </div>
              <SwatchGrid cols="sm:grid-cols-3">
                <TokenSwatch cssVar={`--${key}`} usage={`bg-${key}`} values={values} />
                <TokenSwatch cssVar={`--${key}-soft`} usage={`bg-${key}-soft`} values={values} />
                <TokenSwatch cssVar={`--${key}-foreground`} usage={`text-${key}-foreground`} values={values} />
              </SwatchGrid>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            <code className="font-mono">destructive</code> aliases{" "}
            <code className="font-mono">danger</code>. Hover states use opacity modifiers
            (e.g. <code className="font-mono">hover:bg-primary/90</code>).
          </p>
        </div>
      </section>

      {/* Typography */}
      <section className="flex flex-col gap-5">
        <SectionHeading hint="The type scale is fluid: sizes and weights from the spacing rhythm, colors from the typography tokens.">
          Typography
        </SectionHeading>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
            <span className="font-mono text-[11px] text-muted-foreground">Size scale</span>
            <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
              {TYPOGRAPHY_SIZES.map((size) => (
                <div key={size.cls} className="flex flex-col gap-1">
                  <span className={cn("font-semibold tracking-tight text-foreground", size.cls)}>
                    Aa
                  </span>
                  <span className="font-mono text-[10px] text-subtle">{size.cls}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
            <span className="font-mono text-[11px] text-muted-foreground">Weights</span>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {TYPOGRAPHY_WEIGHTS.map((weight) => (
                <div key={weight.cls} className="flex flex-col gap-1">
                  <span className={cn("text-xl tracking-tight text-foreground", weight.cls)}>
                    {weight.label}
                  </span>
                  <span className="font-mono text-[10px] text-subtle">{weight.cls}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
            <span className="font-mono text-[11px] text-muted-foreground">Color roles</span>
            <div className="flex flex-col gap-3 text-sm">
              <p className="font-medium text-foreground">Foreground — primary text, headings.</p>
              <p className="text-muted-foreground">Muted foreground — secondary text, labels, helpers.</p>
              <p className="text-subtle">Subtle — placeholders, tertiary metadata.</p>
              <p className="text-accent">Primary/accent — links and interactive highlights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="flex flex-col gap-5">
        <SectionHeading hint="A 4px base unit. Fractional steps (gap-0.5, p-1.5) resolve through the --spacing multiplier; named --space-* tokens cover the integer scale.">
          Spacing scale
        </SectionHeading>
        <div className="flex flex-col gap-2.5">
          {SPACING.map((row) => (
            <div key={row.token} className="flex items-center gap-4">
              <div className="flex w-44 shrink-0 flex-col">
                <span className="font-mono text-xs font-medium text-foreground">{row.usage}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {row.token} · {row.px}
                </span>
              </div>
              <div className="h-4 flex-1 rounded-full bg-muted/60">
                <div
                  className="h-4 rounded-full bg-primary/80"
                  style={{ width: row.width }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Radius */}
      <section className="flex flex-col gap-5">
        <SectionHeading hint="Derived from an 8px base — each step adds 4px; full is reserved for pills and avatars.">
          Radius scale
        </SectionHeading>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {RADII.map((radius) => (
            <div
              key={radius.token}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-3"
            >
              <div
                className={cn("h-12 w-full border border-border bg-primary-soft", radius.cls)}
              />
              <div className="flex flex-col items-center">
                <span className="font-mono text-xs font-medium text-foreground">{radius.cls}</span>
                <span className="font-mono text-[10px] text-subtle">{radius.px}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section className="flex flex-col gap-5">
        <SectionHeading hint="Every shadow is built from --shadow-color, so depth reads correctly in both themes.">
          Shadow scale
        </SectionHeading>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SHADOWS.map((shadow) => (
            <div
              key={shadow.token}
              className={cn(
                "flex h-24 flex-col items-center justify-center rounded-xl border border-border bg-surface p-3",
                shadow.cls
              )}
            >
              <span className="font-mono text-xs font-medium text-foreground">{shadow.cls}</span>
              <span className="font-mono text-[10px] text-subtle">{shadow.token}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Motion */}
      <section className="flex flex-col gap-5">
        <SectionHeading hint="Named durations, named easings, and keyframed animation tokens — all utilities, all theme-safe.">
          Motion tokens
        </SectionHeading>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] text-muted-foreground">Durations</span>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <span
                  key={d.token}
                  className="rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs text-foreground"
                >
                  {d.token.replace("--duration-", "")} · {d.value}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] text-muted-foreground">Easings</span>
            <div className="flex flex-wrap gap-2">
              {EASINGS.map((e) => (
                <span
                  key={e.token}
                  className="rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs text-foreground"
                >
                  {e.token.replace("--ease-", "")} · {e.value}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] text-muted-foreground">Animation lab</span>
            <AnimationLab />
          </div>
        </div>
      </section>

      {/* In practice */}
      <section className="flex flex-col gap-5">
        <SectionHeading hint="The same tokens compose the real component library — nothing is styled with a raw palette color.">
          Tokens in practice
        </SectionHeading>
        <PracticeDemo />
      </section>
    </DocsLayout>
  );
}
