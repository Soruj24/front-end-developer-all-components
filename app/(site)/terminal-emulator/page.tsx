"use client";

import { ComponentPreview } from "@/components/preview";
import { TerminalEmulator } from "@/components/ui";
import {
  extraCommands,
  customFs,
  welcomeBanner,
  customBootScript,
} from "@/components/terminal-emulator/demo";

export default function TerminalEmulatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Terminal Emulator
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A browser-based terminal with a boot typing animation, arrow-key
          command history, Tab autocomplete for commands and paths, a simulated
          filesystem, six color themes, and a draggable resize handle — every
          line is typed out live, and there is no backend anywhere in sight.
        </p>
      </header>

      <ComponentPreview id="terminal-emulator-full">
        <div className="flex w-full flex-col gap-3 py-6">
          <TerminalEmulator
            username="ada"
            hostname="playground"
            height={520}
            welcome={welcomeBanner}
            bootScript={["whoami", "ls", "neofetch"]}
          />
          <p className="text-xs text-subtle">
            Try <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">help</kbd>,{" "}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">cd</kbd>{" "}
            + <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">Tab</kbd> to
            autocomplete paths, <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↑</kbd>/
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↓</kbd> for history,{" "}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">themes</kbd> to
            switch palettes, and drag the bottom handle to resize.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="terminal-emulator-commands">
        <div className="flex w-full flex-col gap-3 py-6">
          <TerminalEmulator
            username="ada"
            hostname="playground"
            height={440}
            commands={extraCommands}
            bootScript={customBootScript}
          />
          <p className="text-xs text-subtle">
            Custom commands (<kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">fortune</kbd>,{" "}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">quote</kbd>,{" "}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">weather</kbd>) are
            injected through the <code className="font-mono">commands</code> prop and merge over the
            built-ins.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="terminal-emulator-fs">
        <div className="flex w-full flex-col gap-3 py-6">
          <TerminalEmulator
            username="ada"
            hostname="playground"
            theme="matrix"
            height={420}
            fs={customFs}
            bootScript={["whoami", "ls", "cat notes/ideas.md", "pwd"]}
          />
          <p className="text-xs text-subtle">
            A custom virtual filesystem — the whole tree lives in a plain
            object, so <code className="font-mono">ls</code>,{" "}
            <code className="font-mono">cd</code>, <code className="font-mono">cat</code> and Tab path
            completion work with no server.
          </p>
        </div>
      </ComponentPreview>
    </div>
  );
}
