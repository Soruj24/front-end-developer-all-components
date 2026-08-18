"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent } from "@/components/ui";

const installCommand = "npx component-library@latest add rating-stars";

const usageCode = `import { Rating } from "@/components/ui";

export default function Example() {
  return <Rating value={3} onChange={(v) => console.log(v)} />;
}`;

const reviews = [
  { name: "Alice", rating: 5, text: "Absolutely love this product!" },
  { name: "Bob", rating: 4, text: "Great quality, fast shipping." },
  { name: "Carol", rating: 3, text: "It's decent, nothing special." },
];

export default function RatingStarsPage() {
  const [rating, setRating] = useState(3);
  const [hovered, setHovered] = useState(0);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Rating Stars</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Star rating with hover preview, read-only mode, and accessible keyboard interaction.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Default</h3>
          <ComponentPreview id="rating-stars-default">
            <div className="flex w-full items-center justify-center gap-1 py-10">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="text-3xl transition-colors" onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)}>
                  {star <= (hovered || rating) ? "★" : "☆"}
                </button>
              ))}
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Read Only</h3>
          <ComponentPreview id="rating-stars-readonly">
            <div className="flex w-full items-center justify-center gap-1 py-10">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`text-2xl ${star <= 4 ? "text-yellow-400" : "text-muted-foreground"}`}>{star <= 4 ? "★" : "☆"}</span>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">(4.0)</span>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive with Reviews</h3>
          <ComponentPreview id="rating-stars-interactive">
            <Card className="w-full max-w-md">
              <CardContent className="p-4">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)} className="text-2xl text-yellow-400 transition-transform hover:scale-110">
                        {star <= (hovered || rating) ? "★" : "☆"}
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{rating}/5</span>
                </div>
                <div className="space-y-3">
                  {reviews.map((rev, i) => (
                    <div key={i} className="border-t border-border pt-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{rev.name}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => <span key={s} className={`text-xs ${s <= rev.rating ? "text-yellow-400" : "text-muted-foreground"}`}>★</span>)}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{rev.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: number) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}