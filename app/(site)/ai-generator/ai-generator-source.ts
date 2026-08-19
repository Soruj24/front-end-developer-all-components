export const AI_GENERATOR_SOURCE = `"use client";

import { useState } from "react";

export function AiGenerator() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<"idle" | "generating" | "done">("idle");
  const [code, setCode] = useState("");

  const generate = async () => {
    if (!prompt.trim()) return;
    setStatus("generating");
    await new Promise((r) => setTimeout(r, 800));
    setCode(
      \`export function GeneratedComponent() {
  return <div className="rounded-lg border bg-card p-6">Hello from \${prompt}</div>;
}\`
    );
    setStatus("done");
  };

  return (
    <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">AI Component Generator</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Describe a component in plain language and generate production-ready React + Tailwind code.
      </p>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. A pricing card with a featured tier"
        className="mt-4 w-full rounded-lg border border-border bg-background p-3 text-sm"
        rows={3}
      />
      <button
        onClick={generate}
        disabled={!prompt.trim() || status === "generating"}
        className="mt-3 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-40"
      >
        {status === "generating" ? "Generating…" : "Generate"}
      </button>
      {status === "done" && (
        <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-4 text-xs">{code}</pre>
      )}
    </div>
  );
}`;

export const GENERATE_EXAMPLE = `<AiGenerator />`;