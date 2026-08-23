"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Highlighter,
  Type,
  PenTool,
  Paintbrush,
  Star,
  Zap,
  Sparkles,
} from "lucide-react";

const installCommand = `npx component-library@latest add highlight-text`;
const usageCode = `import { HighlightText } from "@/components/highlight-text";

<HighlightText variant="solid" color="yellow">
  Important text to highlight
</HighlightText>`;

function TextHighlight() {
  const [color, setColor] = useState("yellow");
  const colors = ["yellow", "green", "blue", "pink", "purple"];
  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${color === c ? "bg-primary text-primary-foreground" : "border hover:bg-muted"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="text-lg leading-relaxed text-foreground">
        This is{" "}
        <span className={`bg-${color}-200 dark:bg-${color}-800 px-1 rounded`}>
          highlighted text
        </span>{" "}
        within a paragraph for emphasis.
      </p>
    </div>
  );
}

function ColorHighlight() {
  const variants = [
    { bg: "bg-yellow-200 dark:bg-yellow-800", label: "Yellow" },
    { bg: "bg-green-200 dark:bg-green-800", label: "Green" },
    { bg: "bg-blue-200 dark:bg-blue-800", label: "Blue" },
    { bg: "bg-pink-200 dark:bg-pink-800", label: "Pink" },
    { bg: "bg-purple-200 dark:bg-purple-800", label: "Purple" },
    { bg: "bg-orange-200 dark:bg-orange-800", label: "Orange" },
  ];
  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      {variants.map((v) => (
        <p key={v.label} className="text-base leading-relaxed text-foreground">
          <span className={`${v.bg} px-1.5 py-0.5 rounded font-medium`}>{v.label} highlight</span>{" "}
          creates a colored background behind the text.
        </p>
      ))}
    </div>
  );
}

function UnderlineHighlight() {
  const styles = [
    { className: "border-b-2 border-primary", label: "Solid underline" },
    { className: "border-b-2 border-dashed border-primary", label: "Dashed underline" },
    { className: "border-b-2 border-dotted border-primary", label: "Dotted underline" },
    { className: "border-b-2 border-double border-primary", label: "Double underline" },
    { className: "bg-primary/20 border-b-2 border-primary", label: "Underline + bg" },
  ];
  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      {styles.map((s) => (
        <p key={s.label} className="text-base leading-relaxed text-foreground">
          <span className={`${s.className} px-1`}>{s.label}</span>{" "}
          adds emphasis with different underline styles.
        </p>
      ))}
    </div>
  );
}

function GradientHighlight() {
  const gradients = [
    { bg: "bg-gradient-to-r from-purple-400 to-pink-400", label: "Purple to Pink" },
    { bg: "bg-gradient-to-r from-blue-400 to-cyan-400", label: "Blue to Cyan" },
    { bg: "bg-gradient-to-r from-orange-400 to-red-400", label: "Orange to Red" },
    { bg: "bg-gradient-to-r from-green-400 to-emerald-400", label: "Green to Emerald" },
  ];
  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      {gradients.map((g) => (
        <p key={g.label} className="text-base leading-relaxed text-foreground">
          <span className="relative inline-block">
            <span className="relative z-10">{g.label}</span>
            <span className={`absolute bottom-0 left-0 right-0 h-3 ${g.bg} opacity-30 -rotate-1`} />
          </span>{" "}
          for a modern gradient look.
        </p>
      ))}
    </div>
  );
}

function NeonHighlight() {
  const [glow, setGlow] = useState(true);
  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <button
        onClick={() => setGlow(!glow)}
        className="self-start px-3 py-1.5 text-xs font-medium rounded-md border hover:bg-muted transition-colors"
      >
        {glow ? "Disable Glow" : "Enable Glow"}
      </button>
      <p className="text-lg leading-relaxed text-foreground">
        <span className={`text-primary font-semibold ${glow ? "drop-shadow-[0_0_6px_rgba(var(--primary-rgb),0.6)]" : ""}`}>
          Neon glow highlight
        </span>{" "}
        creates a luminous text-shadow effect.
      </p>
      <p className="text-lg leading-relaxed text-foreground">
        This effect works great on{" "}
        <span className={`text-emerald-400 font-bold ${glow ? "drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" : ""}`}>
          dark backgrounds
        </span>
        {" "}for maximum impact.
      </p>
    </div>
  );
}

function MarkerEffect() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <p className="text-lg leading-relaxed text-foreground">
        <span className="relative inline-block">
          <span className="relative z-10">Marker pen effect</span>
          <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
            <path d="M0 8 Q50 0, 100 8 T200 8" stroke="currentColor" strokeWidth="4" fill="none" className="text-yellow-300 dark:text-yellow-600" strokeLinecap="round" />
          </svg>
        </span>{" "}
        mimics a hand-drawn marker underline with a curved stroke.
      </p>
      <p className="text-lg leading-relaxed text-foreground">
        <span className="relative inline-block">
          <span className="relative z-10">Double marker lines</span>
          <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
            <path d="M0 4 Q50 0, 100 4 T200 4" stroke="currentColor" strokeWidth="2" fill="none" className="text-pink-300 dark:text-pink-600" strokeLinecap="round" />
            <path d="M0 10 Q50 6, 100 10 T200 10" stroke="currentColor" strokeWidth="2" fill="none" className="text-pink-300 dark:text-pink-600" strokeLinecap="round" />
          </svg>
        </span>{" "}
        with two strokes for emphasis.
      </p>
    </div>
  );
}

function SearchHighlight() {
  const [query, setQuery] = useState("");
  const text = "The quick brown fox jumps over the lazy dog. The fox was quick and agile.";
  const words = text.split(" ");
  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          placeholder="Type to highlight words..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {query && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {words.filter((w) => w.toLowerCase().includes(query.toLowerCase())).length} matches
          </span>
        )}
      </div>
      <p className="text-lg leading-relaxed text-foreground">
        {words.map((word, i) => {
          const isMatch = query && word.toLowerCase().includes(query.toLowerCase());
          return (
            <span key={i}>
              <span className={`transition-colors ${isMatch ? "bg-yellow-200 dark:bg-yellow-800 rounded px-0.5" : ""}`}>
                {word}
              </span>{" "}
            </span>
          );
        })}
      </p>
    </div>
  );
}

export default function HighlightTextPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Highlight Text
          </h1>
          <Badge variant="primary">Typography</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Text highlighting components with solid colors, underlines, gradients, neon glow, marker effects, and interactive search-based highlighting.
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
          <h3 className="text-lg font-medium text-foreground">Text Highlight</h3>
          <p className="text-sm text-muted-foreground">
            Basic text highlighting with selectable background colors.
          </p>
          <ComponentPreview id="highlight-text-basic">
            <TextHighlight />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Color Highlight</h3>
          <p className="text-sm text-muted-foreground">
            Multiple color variants for different emphasis levels.
          </p>
          <ComponentPreview id="highlight-text-color">
            <ColorHighlight />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Underline Highlight</h3>
          <p className="text-sm text-muted-foreground">
            Underline styles including solid, dashed, dotted, and double.
          </p>
          <ComponentPreview id="highlight-text-underline">
            <UnderlineHighlight />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Gradient Highlight</h3>
          <p className="text-sm text-muted-foreground">
            Gradient overlays behind text for a modern look.
          </p>
          <ComponentPreview id="highlight-text-gradient">
            <GradientHighlight />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Neon Highlight</h3>
          <p className="text-sm text-muted-foreground">
            Text-shadow glow effects with toggle control.
          </p>
          <ComponentPreview id="highlight-text-neon">
            <NeonHighlight />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Marker Effect</h3>
          <p className="text-sm text-muted-foreground">
            Hand-drawn marker underline effect using SVG paths.
          </p>
          <ComponentPreview id="highlight-text-marker">
            <MarkerEffect />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Search Highlight</h3>
          <p className="text-sm text-muted-foreground">
            Interactive search input that highlights matching words in real-time.
          </p>
          <ComponentPreview id="highlight-text-search">
            <SearchHighlight />
          </ComponentPreview>
        </div>
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
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{`"solid" | "underline" | "gradient" | "neon"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"solid"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">currentColor</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">as</td>
                <td className="px-4 py-3 text-muted-foreground">{`"mark" | "span" | "div"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"span"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
