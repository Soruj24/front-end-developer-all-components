"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Droplets, Coffee, Snowflake } from "lucide-react";

const installCommand = `npx component-library@latest add cup-soda`;
const usageCode = `import { CupSoda } from "@/components/cup-soda";

<CupSoda flavor="cola" size="md" />`;

type SodaFlavor = "cola" | "lemonade" | "mint" | "orange" | "grape";

const flavorConfig: Record<SodaFlavor, { color: string; fizz: string; label: string }> = {
  cola: { color: "from-amber-800 to-amber-950", fizz: "bg-amber-200", label: "Cola" },
  lemonade: { color: "from-yellow-300 to-yellow-500", fizz: "bg-yellow-100", label: "Lemonade" },
  mint: { color: "from-green-300 to-green-500", fizz: "bg-green-100", label: "Mint" },
  orange: { color: "from-orange-400 to-orange-600", fizz: "bg-orange-100", label: "Orange" },
  grape: { color: "from-purple-400 to-purple-700", fizz: "bg-purple-100", label: "Grape" },
};

function CupDemo({ flavor }: { flavor: SodaFlavor }) {
  const config = flavorConfig[flavor];
  const [fillLevel, setFillLevel] = useState(75);
  const [fizzing, setFizzing] = useState(true);

  useEffect(() => {
    if (!fizzing) return;
    const interval = setInterval(() => {
      setFillLevel((f) => Math.min(95, f + 0.5));
    }, 100);
    return () => clearInterval(interval);
  }, [fizzing]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-32 w-20 rounded-b-3xl border-2 border-t-0 bg-white/90 dark:bg-white/10 overflow-hidden">
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${config.color} transition-all duration-300`}
          style={{ height: `${fillLevel}%` }}
        >
          {fizzing && (
            <>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute rounded-full ${config.fizz} animate-bounce`}
                  style={{
                    width: 3 + Math.random() * 4,
                    height: 3 + Math.random() * 4,
                    left: `${10 + Math.random() * 80}%`,
                    bottom: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </>
          )}
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/50" />
      </div>
      <span className="text-xs font-medium">{config.label}</span>
    </div>
  );
}

function CupRowDemo() {
  return (
    <div className="flex gap-6">
      {(["cola", "lemonade", "mint", "orange", "grape"] as SodaFlavor[]).map((f) => (
        <CupDemo key={f} flavor={f} />
      ))}
    </div>
  );
}

function IceCubeDemo() {
  const [cubes, setCubes] = useState(3);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-36 w-24 rounded-b-3xl border-2 border-t-0 bg-white/90 dark:bg-white/10 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-blue-400 to-blue-300 opacity-50" />
        {[...Array(cubes)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-sm bg-white/70 border border-white/50"
            style={{
              width: 12,
              height: 12,
              top: `${25 + i * 12}%`,
              left: `${15 + (i % 2) * 40}%`,
              transform: `rotate(${i * 15}deg)`,
            }}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={() => setCubes((c) => Math.max(0, c - 1))} className="rounded-md bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80">- Ice</button>
        <button onClick={() => setCubes((c) => Math.min(6, c + 1))} className="rounded-md bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80">+ Ice</button>
      </div>
      <span className="text-xs text-muted-foreground">{cubes} ice cubes</span>
    </div>
  );
}

function PourAnimationDemo() {
  const [pouring, setPouring] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!pouring) return;
    const interval = setInterval(() => {
      setLevel((l) => {
        if (l >= 90) { setPouring(false); return 90; }
        return l + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [pouring]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-36 w-24 rounded-b-3xl border-2 border-t-0 bg-white/90 dark:bg-white/10 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-500 to-orange-400 transition-all" style={{ height: `${level}%` }} />
      </div>
      <button
        onClick={() => { setLevel(0); setPouring(true); }}
        disabled={pouring}
        className={`rounded-md px-4 py-1.5 text-sm font-medium ${pouring ? "bg-muted text-muted-foreground" : "bg-orange-500 text-white hover:bg-orange-600"}`}
      >
        {pouring ? "Pouring..." : "Pour Soda"}
      </button>
    </div>
  );
}

export default function CupSodaPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Cup Soda</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated soda cup with fizzing bubbles, ice cubes, pour animation, and multiple flavor color variants.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">All Flavors</h2>
        <ComponentPreview>
          <CupRowDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Ice Cubes</h2>
        <ComponentPreview>
          <IceCubeDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Pour Animation</h2>
        <ComponentPreview>
          <PourAnimationDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">flavor</td><td className="px-4 py-3 text-muted-foreground">{'"cola" | "lemonade" | "mint" | "orange" | "grape"'}</td><td className="px-4 py-3 text-muted-foreground">{'"cola"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">fizzing</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
