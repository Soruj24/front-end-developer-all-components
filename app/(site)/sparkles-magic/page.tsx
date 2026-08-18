"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Sparkles, Wand2, Star, Zap, Heart, Gift, Award } from "lucide-react";

const installCommand = `npx component-library@latest add sparkles-magic`;
const usageCode = `<SparklesMagic color="gold" count={20} />`;

function MagicButton() {
  const [clicks, setClicks] = useState(0);
  const [sparkle, setSparkle] = useState(false);

  const handleClick = () => {
    setClicks((c) => c + 1);
    setSparkle(true);
    setTimeout(() => setSparkle(false), 600);
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Wand2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Magic Button</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handleClick}
          className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
        >
          {sparkle && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-5 w-5 animate-ping text-white" />
            </span>
          )}
          <span className="relative">Magic Click</span>
        </button>
        <p className="text-sm text-muted-foreground">{clicks} magic spells cast</p>
      </div>
    </div>
  );
}

function SparkleEffect() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const addSparkle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newSparkle = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setSparkles((prev) => [...prev, newSparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 1000);
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Sparkle Effect</span>
      </div>
      <div
        onClick={addSparkle}
        className="relative flex h-32 cursor-pointer items-center justify-center rounded-md border-2 border-dashed hover:bg-muted/30"
      >
        <span className="text-sm text-muted-foreground">Click anywhere</span>
        {sparkles.map((s) => (
          <Sparkles
            key={s.id}
            className="absolute h-4 w-4 text-yellow-400 animate-ping"
            style={{ left: s.x - 8, top: s.y - 8 }}
          />
        ))}
      </div>
    </div>
  );
}

function TransformAnimation() {
  const [transformed, setTransformed] = useState(false);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Zap className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Transform Animation</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setTransformed(!transformed)}
          className={`rounded-lg px-6 py-3 text-sm font-medium transition-all duration-500 ${
            transformed
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg scale-110 rotate-3"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {transformed ? (
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-white" /> Transformed!
            </span>
          ) : (
            "Click to Transform"
          )}
        </button>
      </div>
    </div>
  );
}

function MagicWand() {
  const [waving, setWaving] = useState(false);
  const [message, setMessage] = useState("Wave the wand!");

  const wave = () => {
    setWaving(true);
    setMessage("Casting spell...");
    setTimeout(() => {
      setMessage("Abracadabra! ✨");
      setWaving(false);
    }, 1500);
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Wand2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Magic Wand</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={wave}
          disabled={waving}
          className={`flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-70 ${
            waving ? "animate-bounce" : ""
          }`}
        >
          <Wand2 className={`h-4 w-4 ${waving ? "animate-spin" : ""}`} />
          {waving ? "Waving..." : "Wave Wand"}
        </button>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

function CelebrationEffect() {
  const [celebrating, setCelebrating] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string }[]>([]);

  const celebrate = () => {
    setCelebrating(true);
    const colors = ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400"];
    const pieces = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(pieces);
    setTimeout(() => {
      setCelebrating(false);
      setConfetti([]);
    }, 2000);
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Gift className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Celebration Effect</span>
      </div>
      <div className="relative flex flex-col items-center gap-3">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className={`absolute h-2 w-2 rounded-full ${piece.color} animate-bounce`}
            style={{
              left: `${piece.x}%`,
              top: "0%",
              animationDuration: `${0.5 + Math.random() * 1}s`,
            }}
          />
        ))}
        <button
          onClick={celebrate}
          disabled={celebrating}
          className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-70"
        >
          {celebrating ? "🎉 Celebrating!" : "Celebrate!"}
        </button>
      </div>
    </div>
  );
}

function EnchantedCard() {
  const [glowing, setGlowing] = useState(false);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Heart className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Enchanted Card</span>
      </div>
      <div
        onClick={() => setGlowing(!glowing)}
        className={`cursor-pointer rounded-xl border-2 p-6 text-center transition-all duration-300 ${
          glowing
            ? "border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-purple-50 to-pink-50"
            : "hover:border-muted-foreground/30"
        }`}
      >
        <Sparkles className={`mx-auto h-8 w-8 ${glowing ? "text-purple-500" : "text-muted-foreground"}`} />
        <h3 className="mt-2 text-sm font-semibold">Enchanted Card</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {glowing ? "The magic is alive!" : "Click to enchant"}
        </p>
      </div>
    </div>
  );
}

function WizardSpell() {
  const [spell, setSpell] = useState("");
  const [casting, setCasting] = useState(false);
  const spells = [
    { name: "Lumos", icon: Star, color: "text-yellow-400" },
    { name: "Leviosa", icon: Zap, color: "text-blue-400" },
    { name: "Expelliarmus", icon: Sparkles, color: "text-red-400" },
  ];

  const castSpell = (name: string) => {
    setSpell(name);
    setCasting(true);
    setTimeout(() => setCasting(false), 1200);
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Award className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Wizard Spell</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {spells.map((s) => (
            <button
              key={s.name}
              onClick={() => castSpell(s.name)}
              className={`flex items-center gap-1 rounded-md border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted ${
                spell === s.name && casting ? "bg-muted" : ""
              }`}
            >
              <s.icon className={`h-3 w-3 ${s.color}`} />
              {s.name}
            </button>
          ))}
        </div>
        {casting && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 animate-spin text-purple-500" />
            Casting {spell}...
          </div>
        )}
        {spell && !casting && (
          <p className="text-sm text-green-600">✓ {spell} cast successfully!</p>
        )}
      </div>
    </div>
  );
}

export default function SparklesMagicPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sparkles Magic</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An animation component for displaying magical sparkle effects with customizable colors, counts, and particle behaviors.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Magic Button</h2>
        <ComponentPreview component="SparklesMagicButton" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Sparkle Effect</h2>
        <ComponentPreview component="SparklesMagicEffect" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Transform Animation</h2>
        <ComponentPreview component="SparklesMagicTransform" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Magic Wand</h2>
        <ComponentPreview component="SparklesMagicWand" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Celebration Effect</h2>
        <ComponentPreview component="SparklesMagicCelebration" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Enchanted Card</h2>
        <ComponentPreview component="SparklesMagicEnchantedCard" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Wizard Spell</h2>
        <ComponentPreview component="SparklesMagicWizardSpell" />
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
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'"gold"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">count</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">10</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animation</td>
                <td className="px-4 py-3 text-muted-foreground">{'"sparkle" | "float" | "burst"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"sparkle"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
