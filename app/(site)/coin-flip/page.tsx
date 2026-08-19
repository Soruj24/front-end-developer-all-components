"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { COIN_FLIP_SOURCE } from "./coin-flip-source";

const STATES_CODE = `const coin = { label: "Heads", symbol: "H", color: "bg-yellow-500" };

<div className="flex flex-col items-center gap-3">
  <div className={\`h-20 w-20 rounded-full \${coin.color} flex items-center justify-center shadow-lg border-4 border-yellow-300\`}>
    <span className="text-2xl font-bold text-yellow-900">{coin.symbol}</span>
  </div>
  <span className="text-sm text-muted-foreground">{coin.label}</span>
</div>`;

const FLIP_CODE = `<CoinFlip onResult={(result) => console.log(result)} />`;

const SCORE_CODE = `const stats = { heads: 7, tails: 5, total: 12 };

<div className="grid grid-cols-3 gap-4 text-center">
  <div>
    <p className="text-2xl font-bold text-yellow-600">{stats.heads}</p>
    <p className="text-xs text-muted-foreground">Heads</p>
  </div>
  <div>
    <p className="text-2xl font-bold">{stats.total}</p>
    <p className="text-xs text-muted-foreground">Total</p>
  </div>
  <div>
    <p className="text-2xl font-bold text-yellow-700">{stats.tails}</p>
    <p className="text-xs text-muted-foreground">Tails</p>
  </div>
</div>`;

function CoinStatesDemo() {
  return (
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
  );
}

function InteractiveCoinDemo() {
  return (
    <div className="w-full p-4">
      <div className="text-center">
        <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-xl border-4 border-yellow-300 cursor-pointer hover:scale-110 transition-transform" style={{ transformStyle: "preserve-3d" }}>
          <span className="text-3xl font-bold text-yellow-900">H</span>
        </div>
        <button className="mt-6 px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Flip Coin</button>
      </div>
    </div>
  );
}

function ScoreTrackerDemo() {
  return (
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
  );
}

export default function CoinFlipPage() {
  return (
    <ComponentDocPage
      name="Coin Flip"
      category="Animation"
      description="An animated coin flip component with 3D rotation, hover effects, and random result generation for gamification."
    >
      <PreviewPanel filename="coin-flip.tsx">
        <CoinStatesDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={COIN_FLIP_SOURCE}
        filename="components/ui/CoinFlip/CoinFlip.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Coin States" description="Heads and tails sides of the coin." code={STATES_CODE}>
          <CoinStatesDemo />
        </ExampleBlock>

        <ExampleBlock title="Interactive Flip" description="A clickable coin that shows a flip animation." code={FLIP_CODE}>
          <InteractiveCoinDemo />
        </ExampleBlock>

        <ExampleBlock title="Score Tracker" description="Coin flip with result history and score display." code={SCORE_CODE}>
          <ScoreTrackerDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}