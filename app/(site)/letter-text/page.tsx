"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Type, LetterText, User, Grid3x3, Sparkles, Hash, Star } from "lucide-react";

const installCommand = `npm install @your-org/ui`;

const usageCode = `import { LetterText } from "@your-org/ui";

<LetterText size="md" variant="default">
  Hello
</LetterText>`;

function DropCapDemo() {
  const [copied, setCopied] = useState(false);
  return (
    <ComponentPreview
      name="DropCapDemo"
      code={`<div className="max-w-md text-sm leading-relaxed text-muted-foreground">
  <span className="float-left text-6xl font-serif font-bold text-primary mr-2 mt-1">
    T
  </span>
  he quick brown fox jumps over the lazy dog. This is an example
  of drop cap styling commonly found in editorial layouts and articles.
</div>`}
    >
      <div className="max-w-md text-sm leading-relaxed text-muted-foreground">
        <span className="float-left text-6xl font-serif font-bold text-primary mr-2 mt-1">
          T
        </span>
        he quick brown fox jumps over the lazy dog. This is an example of drop
        cap styling commonly found in editorial layouts and articles.
      </div>
    </ComponentPreview>
  );
}

function MonogramDemo() {
  return (
    <ComponentPreview
      name="MonogramDemo"
      code={`<div className="flex items-center gap-4">
  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
    AB
  </div>
  <div className="w-14 h-14 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center text-2xl font-semibold tracking-tight">
    JD
  </div>
  <div className="w-16 h-16 rounded-full border-2 border-primary text-primary flex items-center justify-center text-3xl font-light">
    MK
  </div>
</div>`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
          AB
        </div>
        <div className="w-14 h-14 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center text-2xl font-semibold tracking-tight">
          JD
        </div>
        <div className="w-16 h-16 rounded-full border-2 border-primary text-primary flex items-center justify-center text-3xl font-light">
          MK
        </div>
      </div>
    </ComponentPreview>
  );
}

function HeroLetterDemo() {
  return (
    <ComponentPreview
      name="HeroLetterDemo"
      code={`<div className="py-12 text-center">
  <div className="text-[120px] font-black leading-none bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent select-none">
    A
  </div>
  <p className="mt-4 text-lg text-muted-foreground font-medium">
    The letter &quot;A&quot; in hero display
  </p>
</div>`}
    >
      <div className="py-12 text-center">
        <div className="text-[120px] font-black leading-none bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent select-none">
          A
        </div>
        <p className="mt-4 text-lg text-muted-foreground font-medium">
          The letter &quot;A&quot; in hero display
        </p>
      </div>
    </ComponentPreview>
  );
}

function AlphabetGridDemo() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <ComponentPreview
      name="AlphabetGridDemo"
      code={`<div className="grid grid-cols-9 gap-1.5">
  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
    <div
      key={letter}
      className="w-8 h-8 flex items-center justify-center rounded text-sm font-medium bg-muted hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
    >
      {letter}
    </div>
  ))}
</div>`}
    >
      <div className="grid grid-cols-9 gap-1.5">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <div
            key={letter}
            className="w-8 h-8 flex items-center justify-center rounded text-sm font-medium bg-muted hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
          >
            {letter}
          </div>
        ))}
      </div>
    </ComponentPreview>
  );
}

function InitialAvatarDemo() {
  const [selected, setSelected] = useState("S");
  const initials = ["S", "J", "A", "R", "M", "K"];
  return (
    <ComponentPreview
      name="InitialAvatarDemo"
      code={`<div className="flex flex-col items-center gap-4">
  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-lg">
    S
  </div>
  <div className="flex gap-2">
    {["S", "J", "A", "R", "M", "K"].map((letter) => (
      <button
        key={letter}
        className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        {letter}
      </button>
    ))}
  </div>
</div>`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-lg">
          {selected}
        </div>
        <div className="flex gap-2">
          {initials.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelected(letter)}
              className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </ComponentPreview>
  );
}

function DecorativeLetterDemo() {
  return (
    <ComponentPreview
      name="DecorativeLetterDemo"
      code={`<div className="flex flex-col items-center gap-6">
  <div className="relative">
    <span className="text-8xl font-serif italic text-primary/20 select-none">
      Q
    </span>
    <span className="absolute inset-0 text-8xl font-serif italic text-primary flex items-center justify-center">
      Q
    </span>
  </div>
  <div className="text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
    STYLE
  </div>
  <div className="text-4xl font-light tracking-[0.3em] border-b-2 border-primary pb-2">
    ELEGANT
  </div>
</div>`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <span className="text-8xl font-serif italic text-primary/20 select-none">
            Q
          </span>
          <span className="absolute inset-0 text-8xl font-serif italic text-primary flex items-center justify-center">
            Q
          </span>
        </div>
        <div className="text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
          STYLE
        </div>
        <div className="text-4xl font-light tracking-[0.3em] border-b-2 border-primary pb-2">
          ELEGANT
        </div>
      </div>
    </ComponentPreview>
  );
}

function LetterCounterDemo() {
  const [text, setText] = useState("Hello World");
  const letterCount = text.replace(/[^a-zA-Z]/g, "").length;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <ComponentPreview
      name="LetterCounterDemo"
      code={`<div className="w-full max-w-sm space-y-4">
  <input
    type="text"
    value="Hello World"
    className="w-full px-3 py-2 rounded-md border bg-background text-sm"
    readOnly
  />
  <div className="flex gap-3">
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-sm">
      <Type className="h-4 w-4 text-primary" />
      <span className="font-mono font-semibold">11</span>
      <span className="text-muted-foreground">letters</span>
    </div>
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-sm">
      <Hash className="h-4 w-4 text-primary" />
      <span className="font-mono font-semibold">2</span>
      <span className="text-muted-foreground">words</span>
    </div>
  </div>
</div>`}
    >
      <div className="w-full max-w-sm space-y-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 rounded-md border bg-background text-sm"
          placeholder="Type something..."
        />
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-sm">
            <Type className="h-4 w-4 text-primary" />
            <span className="font-mono font-semibold">{letterCount}</span>
            <span className="text-muted-foreground">letters</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-sm">
            <Hash className="h-4 w-4 text-primary" />
            <span className="font-mono font-semibold">{wordCount}</span>
            <span className="text-muted-foreground">words</span>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
}

export default function LetterTextPage() {
  return (
    <div className="container max-w-4xl py-10 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <LetterText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Letter Text</h1>
          <Badge variant="secondary">Components</Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Text styling utilities for letters, initials, monograms, and decorative
          typography. Perfect for editorial layouts, branding, and creative design.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Installation
        </h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Usage
        </h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Grid3x3 className="h-5 w-5 text-primary" />
          Examples
        </h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Type className="h-4 w-4" />
            Drop Cap
          </h3>
          <DropCapDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Monogram
          </h3>
          <MonogramDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Hero Letter
          </h3>
          <HeroLetterDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Grid3x3 className="h-4 w-4" />
            Alphabet Grid
          </h3>
          <AlphabetGridDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Initial Avatar
          </h3>
          <InitialAvatarDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Star className="h-4 w-4" />
            Decorative Letter
          </h3>
          <DecorativeLetterDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Letter Counter
          </h3>
          <LetterCounterDemo />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <div className="rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Prop</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Default</th>
                <th className="p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">size</td>
                <td className="p-3">string</td>
                <td className="p-3 font-mono text-xs">"md"</td>
                <td className="p-3 text-muted-foreground">
                  Size of the letter text element
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">variant</td>
                <td className="p-3">string</td>
                <td className="p-3 font-mono text-xs">"default"</td>
                <td className="p-3 text-muted-foreground">
                  Visual variant of the letter text
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3">string</td>
                <td className="p-3 font-mono text-xs">—</td>
                <td className="p-3 text-muted-foreground">
                  Additional CSS classes to apply
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
