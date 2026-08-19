"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { TerminalEmulator } from "@/components/ui";
import {
  extraCommands,
  customFs,
  welcomeBanner,
  customBootScript,
} from "@/components/terminal-emulator/demo";

const TERMINAL_EMULATOR_SOURCE = `"use client";

import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import type { TerminalCommand, TermSpan, TermOut } from "./TerminalEmulator.types";

export interface TerminalEmulatorProps {
  height?: number;
  username?: string;
  hostname?: string;
  commands?: TerminalCommand[];
  boot?: boolean;
  bootScript?: string[];
  welcome?: string[];
  autoFocus?: boolean;
  className?: string;
}

const span = (text: string, color?: string, opts?: { bold?: boolean }): TermSpan =>
  ({ text, color, bold: opts?.bold });

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function TerminalEmulator({
  height = 480,
  username = "ada",
  hostname = "playground",
  commands: extraCommands,
  boot = true,
  bootScript = ["whoami", "ls", "neofetch"],
  welcome = [],
  autoFocus = false,
  className,
}: TerminalEmulatorProps) {
  const [lines, setLines] = useState<Array<{ kind: string; spans: TermSpan[]; raw?: string }>>([]);
  const [buffer, setBuffer] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const runSeqRef = useRef(0);

  const prompt = useCallback(
    () => \`\${username}@\${hostname}:~\$ \`,
    [username, hostname]
  );

  const appendLine = useCallback((spans: TermSpan[], raw?: string) => {
    setLines((prev) => [...prev.slice(-2000), { kind: "output", spans, raw }]);
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    });
  }, []);

  const commands = useMemo(() => [
    { name: "whoami", description: "Print current user", run: () => [span(username, "accent")] },
    { name: "hostname", description: "Print hostname", run: () => [span(hostname, "accent")] },
    { name: "pwd", description: "Print working directory", run: () => [span("~")] },
    { name: "clear", description: "Clear the screen", run: () => { setLines([]); return []; } },
    { name: "help", description: "List commands", run: () => all.map((c) => span(\`\${c.name.padEnd(12)}\${c.description}\`, "dim")) },
    ...(extraCommands ?? []),
  ], [username, hostname, extraCommands]);

  const all = commands;

  const submit = () => {
    const raw = buffer.trim();
    appendLine([span(prompt(), "accent"), span(raw)], raw);
    setBuffer("");
    if (!raw) return;
    const [name, ...args] = raw.split(/\\s+/);
    const cmd = commands.find((c) => c.name === name);
    const runId = ++runSeqRef.current;
    void (async () => {
      const out: TermOut = cmd ? await cmd.run(args) : [span(\`command not found: \${name}\`, "error")];
      if (runSeqRef.current !== runId) return;
      for (const item of out) {
        appendLine([item]);
        await sleep(60);
      }
    })();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); if (!busy) submit(); }
    else if (e.key === "c" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runSeqRef.current += 1;
      setBusy(false);
      appendLine([span("^C", "dim")]);
    }
  };

  return (
    <div
      className={cn("flex flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 font-mono text-sm text-zinc-100", className)}
      style={{ height }}
    >
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-zinc-500">{username}@{hostname}</span>
      </div>
      <div ref={bodyRef} className="flex-1 overflow-y-auto p-4">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {line.spans.map((s, j) => (
              <span key={j} className={s.color === "error" ? "text-red-400" : s.color === "accent" ? "text-emerald-400" : s.color === "dim" ? "text-zinc-500" : s.bold ? "font-bold" : ""}>
                {s.text}
              </span>
            ))}
          </div>
        ))}
        <div className="flex items-center gap-1">
          <span className="text-emerald-400">{prompt()}</span>
          <input
            ref={inputRef}
            value={buffer}
            onChange={(e) => setBuffer(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus={autoFocus}
            className="flex-1 bg-transparent outline-none"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}`;

export default function TerminalEmulatorPage() {
  return (
    <ComponentDocPage
      name="Terminal Emulator"
      category="Data Display"
      description="A browser-based terminal with a boot typing animation, command history, Tab autocomplete, a simulated filesystem, and six color themes."
    >
      <PreviewPanel filename="terminal-emulator.tsx">
        <TerminalEmulator
          username="ada"
          hostname="playground"
          height={420}
          commands={extraCommands}
          welcome={welcomeBanner}
          bootScript={["whoami", "ls", "neofetch"]}
        />
      </PreviewPanel>

      <SourceCodeViewer
        source={TERMINAL_EMULATOR_SOURCE}
        filename="components/ui/TerminalEmulator/TerminalEmulator.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Custom Filesystem"
          description="Seed the terminal with a bespoke file tree."
          code={TERMINAL_EMULATOR_SOURCE}
        >
          <TerminalEmulator
            username="ada"
            hostname="playground"
            height={420}
            fs={customFs}
            welcome={welcomeBanner}
            bootScript={["ls", "cd projects", "cat analytical-engine.ts"]}
          />
        </ExampleBlock>

        <ExampleBlock
          title="Extra Commands"
          description="Register custom commands with the built-ins."
          code={TERMINAL_EMULATOR_SOURCE}
        >
          <TerminalEmulator
            username="ada"
            hostname="playground"
            height={420}
            commands={extraCommands}
            welcome={welcomeBanner}
            bootScript={customBootScript}
          />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}