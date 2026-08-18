"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Star, Heart, ThumbsUp } from "lucide-react";

const installCommand = `npx component-library@latest add rating-input`;

const usageCode = `import { useState } from "react";
import { Star } from "lucide-react";

function RatingInput({ value, onChange, max = 5 }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          onMouseEnter={() => setHover(i + 1)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i + 1)}
        >
          <Star
            className={\`h-5 w-5 \${
              (hover || value) > i ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }\`}
          />
        </button>
      ))}
    </div>
  );
}`;

function RatingInput({
  value,
  onChange,
  max = 5,
  icon = "star",
  size = "md",
  readonly = false,
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
  icon?: "star" | "heart" | "thumb";
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
}) {
  const [hover, setHover] = useState(0);

  const sizeClass = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-7 w-7" : "h-5 w-5";
  const gapClass = size === "sm" ? "gap-0.5" : "gap-1";

  const IconComponent = icon === "heart" ? Heart : icon === "thumb" ? ThumbsUp : Star;

  return (
    <div className={`flex ${gapClass}`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = (hover || value) > i;
        return (
          <button
            key={i}
            onMouseEnter={() => !readonly && setHover(i + 1)}
            onMouseLeave={() => !readonly && setHover(0)}
            onClick={() => !readonly && onChange(i + 1)}
            disabled={readonly}
            className={`transition-transform ${!readonly ? "hover:scale-110" : ""}`}
          >
            <IconComponent
              className={`${sizeClass} ${
                filled
                  ? icon === "heart"
                    ? "fill-rose-500 text-rose-500"
                    : icon === "thumb"
                    ? "fill-blue-500 text-blue-500"
                    : "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/30"
              } ${icon !== "star" ? "fill-current" : ""}`}
              fill={filled ? "currentColor" : "none"}
            />
          </button>
        );
      })}
    </div>
  );
}

function HalfStarRating({
  value,
  onChange,
  max = 5,
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
}) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => {
        const filled = display > i + 1;
        const half = !filled && display > i;
        return (
          <button
            key={i}
            onMouseEnter={() => setHover(i + 1)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(i + 1)}
            className="relative"
          >
            <Star className="h-5 w-5 text-muted-foreground/30" />
            {(filled || half) && (
              <div className="absolute inset-0 overflow-hidden" style={{ width: filled ? "100%" : "50%" }}>
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function RatingInputPage() {
  const [r1, setR1] = useState(3);
  const [r2, setR2] = useState(4);
  const [r3, setR3] = useState(0);
  const [r4, setR4] = useState(5);
  const [r5, setR5] = useState(3);
  const [r6, setR6] = useState(2);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Rating Input</h1>
          <Badge variant="primary">Form</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An interactive star rating component. Users can hover to preview and click to select a rating. Supports different icons, sizes, and read-only mode.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">Basic 5-star rating input with hover preview.</p>
        </div>
        <ComponentPreview id="rating-default">
          <RatingInput value={r1} onChange={setR1} />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sizes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Small, medium, and large rating inputs.</p>
        </div>
        <ComponentPreview id="rating-sizes">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <RatingInput value={r2} onChange={setR2} size="sm" />
              <span className="text-xs text-muted-foreground">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RatingInput value={r1} onChange={setR1} size="md" />
              <span className="text-xs text-muted-foreground">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RatingInput value={r4} onChange={setR4} size="lg" />
              <span className="text-xs text-muted-foreground">Large</span>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Read Only</h2>
          <p className="mt-1 text-sm text-muted-foreground">Display-only rating that cannot be changed.</p>
        </div>
        <ComponentPreview id="rating-readonly">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <RatingInput value={5} onChange={() => {}} readonly />
              <span className="text-sm text-muted-foreground">5.0 — Excellent</span>
            </div>
            <div className="flex items-center gap-3">
              <RatingInput value={4} onChange={() => {}} readonly />
              <span className="text-sm text-muted-foreground">4.0 — Very Good</span>
            </div>
            <div className="flex items-center gap-3">
              <RatingInput value={3} onChange={() => {}} readonly />
              <span className="text-sm text-muted-foreground">3.0 — Average</span>
            </div>
            <div className="flex items-center gap-3">
              <RatingInput value={0} onChange={() => {}} readonly />
              <span className="text-sm text-muted-foreground">0.0 — Not rated</span>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Heart Icon</h2>
          <p className="mt-1 text-sm text-muted-foreground">Rating with heart icons for favoriting.</p>
        </div>
        <ComponentPreview id="rating-heart">
          <div className="flex items-center gap-3">
            <RatingInput value={r5} onChange={setR5} icon="heart" />
            <span className="text-sm text-muted-foreground">{r5 > 0 ? `Loved ${r5} times` : "Click to love"}</span>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Thumb Up</h2>
          <p className="mt-1 text-sm text-muted-foreground">Rating with thumbs up icons for approval.</p>
        </div>
        <ComponentPreview id="rating-thumb">
          <div className="flex items-center gap-3">
            <RatingInput value={r6} onChange={setR6} icon="thumb" max={5} />
            <span className="text-sm text-muted-foreground">{r6 > 0 ? `${r6} approval` : "Rate this"}</span>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Half Star</h2>
          <p className="mt-1 text-sm text-muted-foreground">Rating with half-star precision support.</p>
        </div>
        <ComponentPreview id="rating-half">
          <HalfStarRating value={r2} onChange={setR2} />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">In Context</h2>
          <p className="mt-1 text-sm text-muted-foreground">Rating input used in a review card.</p>
        </div>
        <ComponentPreview id="rating-context">
          <div className="w-full max-w-md rounded-xl border border-border p-5">
            <h3 className="text-sm font-medium">Write a Review</h3>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Your rating</span>
              <RatingInput value={r3} onChange={setR3} />
              {r3 > 0 && (
                <span className="text-xs text-muted-foreground">
                  {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][r3]}
                </span>
              )}
            </div>
            <textarea
              placeholder="Share your experience..."
              className="mt-3 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
              rows={3}
            />
            <button className="mt-3 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
              Submit Review
            </button>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">{`(value: number) => void`}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">max</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">5</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">icon</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"star" | "heart" | "thumb"`}'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"star"`}'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"sm" | "md" | "lg"`}'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"md"`}'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">readonly</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
