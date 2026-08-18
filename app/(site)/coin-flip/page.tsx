"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add coin-flip`;
const usageCode = `import { CoinFlip } from "@/components/ui/coin-flip";

<CoinFlip onResult={handleResult} />`;

export default function CoinFlipPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Coin Flip</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An animated coin flip component with 3D rotation, hover effects, and random result generation for gamification.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Coin States</h2><p className="mt-1 text-sm text-muted-foreground">Heads and tails sides of the coin.</p></div>
        <ComponentPreview id="coin-flip-states">
          <div className="w-full p-4">
            <div className="flex items-center gap-12 justify-center">
              {[
                { label: "Heads", symbol: "H", color: "bg-yellow-500" },
                { label: "Tails", symbol: "T", color: "bg-yellow-600" },
              ].map((coin) => (
                <div key={coin.label} className="flex flex-col items-center gap-3">
                  <div className={`h-20 w-20 rounded-full ${coin.color} flex items-center justify-center shadow-lg border-4 border-yellow-300`}>
                    <span className="text-2xl font-bold text-yellow-900">{coin.symbol}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{coin.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Flip</h2><p className="mt-1 text-sm text-muted-foreground">A clickable coin that shows a flip animation.</p></div>
        <ComponentPreview id="coin-flip-interactive">
          <div className="w-full p-4">
            <div className="text-center">
              <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-xl border-4 border-yellow-300 cursor-pointer hover:scale-110 transition-transform" style={{ transformStyle: "preserve-3d" }}>
                <span className="text-3xl font-bold text-yellow-900">H</span>
              </div>
              <button className="mt-6 px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Flip Coin</button>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Score Tracker</h2><p className="mt-1 text-sm text-muted-foreground">Coin flip with result history and score display.</p></div>
        <ComponentPreview id="coin-flip-score">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto">
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                {[
                  { label: "Heads", value: "7", color: "text-yellow-600" },
                  { label: "Total", value: "12", color: "text-foreground" },
                  { label: "Tails", value: "5", color: "text-yellow-700" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                {[1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0].map((r, i) => (
                  <div key={i} className={`flex-1 h-2 rounded-full ${r ? "bg-yellow-500" : "bg-yellow-700"}`} />
                ))}
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
