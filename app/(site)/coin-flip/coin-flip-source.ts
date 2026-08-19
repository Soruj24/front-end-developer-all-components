export const COIN_FLIP_SOURCE = `"use client";

import { useState } from "react";

interface CoinFlipProps {
  onResult?: (result: "heads" | "tails") => void;
}

export function CoinFlip({ onResult }: CoinFlipProps) {
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState<"heads" | "tails">("heads");
  const [tosses, setTosses] = useState(0);

  const flip = () => {
    if (flipping) return;
    setFlipping(true);
    const next: "heads" | "tails" = Math.random() < 0.5 ? "heads" : "tails";
    setResult(next);
    setTimeout(() => {
      setFlipping(false);
      setTosses((t) => t + 1);
      onResult?.(next);
    }, 1000);
  };

  const symbol = result === "heads" ? "H" : "T";

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={\`flex h-24 w-24 items-center justify-center rounded-full border-4 border-yellow-300 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-xl transition-transform \${
          flipping ? "animate-spin" : "hover:scale-110"
        }\`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <span className="text-3xl font-bold text-yellow-900">{symbol}</span>
      </div>
      <button
        type="button"
        onClick={flip}
        disabled={flipping}
        className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {flipping ? "Flipping..." : "Flip Coin"}
      </button>
      <p className="text-xs text-muted-foreground">
        {tosses} tosses · result: {result}
      </p>
    </div>
  );
}`;