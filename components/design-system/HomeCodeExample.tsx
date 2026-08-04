"use client";

import { useState } from "react";
import { Button } from "@/components/design-system/Button";

const codeExample = `"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setCount(c => c - 1)}
        className="h-10 w-10 rounded-lg bg-muted
                   hover:bg-muted/80 transition-colors"
      >
        -
      </button>
      <span className="text-2xl font-bold w-12 text-center">
        {count}
      </span>
      <button
        onClick={() => setCount(c => c + 1)}
        className="h-10 w-10 rounded-lg bg-primary
                   text-primary-foreground hover:bg-primary/90
                   transition-colors"
      >
        +
      </button>
    </div>
  );
}`;

export function HomeCodeExample() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="border-t border-border/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Copy, paste, ship
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No complex installation. Just copy the code and start building.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-xl border border-border/50 bg-background shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-danger/60" />
                  <div className="h-3 w-3 rounded-full bg-warning/60" />
                  <div className="h-3 w-3 rounded-full bg-success/60" />
                </div>
                <span className="ml-2 text-xs text-muted-foreground">
                  Counter.tsx
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    Copy
                  </>
                )}
              </Button>
            </div>

            {/* Code */}
            <div className="overflow-x-auto p-4">
              <pre className="text-sm leading-relaxed">
                <code className="text-foreground">
                  {codeExample.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="inline-block w-8 shrink-0 select-none text-right text-muted-foreground/50 pr-4">
                        {i + 1}
                      </span>
                      <span className="flex-1">
                        {colorizeCode(line)}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function colorizeCode(line: string) {
  if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) {
    return <span className="text-muted-foreground">{line}</span>;
  }
  if (line.includes('"use client"') || line.includes('"use server"')) {
    return <span className="text-primary">{line}</span>;
  }
  if (line.includes("import ") || line.includes("export ")) {
    return <span className="text-info">{line}</span>;
  }
  return <span>{line}</span>;
}
