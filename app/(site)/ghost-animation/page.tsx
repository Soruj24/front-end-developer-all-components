"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Ghost, Sparkles } from "lucide-react";

const installCommand = `npx component-library@latest add ghost-animation`;
const usageCode = `import { GhostAnimation } from "@/components/ghost-animation";

<GhostAnimation size="lg" mood="happy" />`;

type GhostMood = "happy" | "spooky" | "surprised" | "sleeping";

function GhostDemo({ mood = "happy", size = 100 }: { mood?: GhostMood; size?: number }) {
  const [bounce, setBounce] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setBounce((b) => (b >= 10 ? 0 : b + 0.5)), 50);
    return () => clearInterval(interval);
  }, []);

  const eyeY = mood === "sleeping" ? 45 : 38;
  const mouthD = mood === "happy" ? "M40,55 Q50,65 60,55" : mood === "spooky" ? "M38,55 L50,50 L62,55" : mood === "surprised" ? "M46,55 A4,4 0 1,0 54,55" : "";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 110" className="h-full w-full" style={{ transform: `translateY(${-Math.abs(Math.sin(bounce * 0.3)) * 5}px)` }}>
        <path
          d="M25,45 Q25,15 50,15 Q75,15 75,45 L75,85 Q70,78 65,85 Q60,78 55,85 Q50,78 45,85 Q40,78 35,85 Q30,78 25,85 Z"
          fill="white"
          className="drop-shadow-lg"
          stroke="currentColor"
          strokeWidth="1"
          style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
        />
        {mood !== "sleeping" ? (
          <>
            <ellipse cx="40" cy={eyeY} rx="3" ry="4" className="fill-gray-800" />
            <ellipse cx="60" cy={eyeY} rx="3" ry="4" className="fill-gray-800" />
            {mood === "surprised" && (
              <>
                <ellipse cx="40" cy={eyeY} rx="1" ry="1.5" fill="white" />
                <ellipse cx="60" cy={eyeY} rx="1" ry="1.5" fill="white" />
              </>
            )}
          </>
        ) : (
          <>
            <line x1="37" y1="40" x2="43" y2="40" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="57" y1="40" x2="63" y2="40" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}
        {mouthD && <path d={mouthD} fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />}
        {mood === "spooky" && (
          <>
            <circle cx="35" cy="30" r="1" className="fill-gray-400" opacity="0.5" />
            <circle cx="65" cy="35" r="1.5" className="fill-gray-400" opacity="0.3" />
          </>
        )}
      </svg>
      {mood === "spooky" && (
        <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-purple-400 animate-pulse" />
      )}
    </div>
  );
}

function GhostRowDemo() {
  return (
    <div className="flex gap-6">
      {(["happy", "spooky", "surprised", "sleeping"] as GhostMood[]).map((m) => (
        <div key={m} className="flex flex-col items-center gap-1">
          <GhostDemo mood={m} size={80} />
          <span className="text-xs text-muted-foreground capitalize">{m}</span>
        </div>
      ))}
    </div>
  );
}

function GhostParadeDemo() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setOffset((o) => (o >= 400 ? 0 : o + 1)), 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 w-full max-w-md overflow-hidden rounded-lg bg-slate-900">
      <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-slate-800 to-transparent" />
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: ((i * 80 - offset + 400) % 400) - 20,
            bottom: 10 + Math.sin((offset + i * 20) * 0.05) * 5,
            opacity: 0.6 + (i / 5) * 0.4,
          }}
        >
          <GhostDemo mood={i % 2 === 0 ? "happy" : "spooky"} size={40} />
        </div>
      ))}
    </div>
  );
}

function FloatingGhostsDemo() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {["#f0f0f0", "#e0e7ff", "#fce7f3", "#ecfdf5"].map((bg, i) => (
        <div key={i} className="flex flex-col items-center gap-1 rounded-lg bg-card p-3 border">
          <GhostDemo mood={["happy", "spooky", "surprised", "sleeping"][i] as GhostMood} size={50} />
          <span className="text-[10px] text-muted-foreground">{["Happy", "Spooky", "Surprise", "Nap"][i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function GhostAnimationPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Ghost Animation</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated ghost characters with mood expressions, floating animation, parade effect, and collection display.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Ghost Moods</h2>
        <ComponentPreview>
          <GhostRowDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Ghost Parade</h2>
        <ComponentPreview>
          <GhostParadeDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Collection Display</h2>
        <ComponentPreview>
          <FloatingGhostsDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">mood</td><td className="px-4 py-3 text-muted-foreground">{'"happy" | "spooky" | "surprised" | "sleeping"'}</td><td className="px-4 py-3 text-muted-foreground">{'"happy"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">100</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
