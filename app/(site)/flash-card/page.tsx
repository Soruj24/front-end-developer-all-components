"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add flash-card`;
const usageCode = `import { FlashCard } from "@/components/ui/flash-card";

<FlashCard front="Question" back="Answer" />`;

export default function FlashCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Flash Card</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An interactive flash card component for study and learning apps with flip animations and progress tracking.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Card</h2><p className="mt-1 text-sm text-muted-foreground">A simple flash card with front and back.</p></div>
        <ComponentPreview id="flash-card-basic">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto h-48 [perspective:600px]">
              <div className="relative h-full w-full [transform-style:preserve-3d]">
                <div className="absolute inset-0 rounded-2xl bg-primary text-primary-foreground flex flex-col items-center justify-center [backface-visibility:hidden]">
                  <p className="text-sm font-medium">What is React?</p>
                  <p className="text-xs opacity-70 mt-2">Tap to reveal</p>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-card border border-border flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="text-sm font-medium">A JavaScript library for building user interfaces</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Card Stack</h2><p className="mt-1 text-sm text-muted-foreground">Stacked flash cards for sequential study.</p></div>
        <ComponentPreview id="flash-card-stack">
          <div className="w-full p-4">
            <div className="relative max-w-xs mx-auto h-48">
              {[2, 1, 0].map((i) => (
                <div key={i} className="absolute inset-0 rounded-2xl border border-border bg-card shadow-md" style={{ transform: `translateY(${i * 4}px) scale(${1 - i * 0.02})`, zIndex: 3 - i }}>
                  {i === 0 && (
                    <div className="h-full flex flex-col items-center justify-center p-6">
                      <p className="text-sm font-medium">Capital of France?</p>
                      <p className="text-xs text-muted-foreground mt-2">Card 1 of 10</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Progress</h2><p className="mt-1 text-sm text-muted-foreground">Flash cards with study progress indicator.</p></div>
        <ComponentPreview id="flash-card-progress">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "30%" }} />
                </div>
                <span className="text-[10px] text-muted-foreground">3/10</span>
              </div>
              <div className="h-40 rounded-2xl bg-card border border-border flex items-center justify-center">
                <p className="text-sm font-medium">H₂O is the chemical formula for...?</p>
              </div>
              <div className="flex gap-2 justify-center">
                <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-600 text-xs font-medium">Don't Know</button>
                <button className="px-4 py-2 rounded-lg bg-green-500/10 text-green-600 text-xs font-medium">Know It</button>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
