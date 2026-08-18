"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { TerminalEmulator } from "@/components/ui";
import {
  extraCommands,
  customFs,
  welcomeBanner,
  customBootScript,
} from "@/components/terminal-emulator/demo";

const installCommand = `npx component-library@latest add terminal-emulator`;

const usageCode = `import { TerminalEmulator } from "@/components/ui";

<TerminalEmulator
  username="ada"
  hostname="playground"
  height={520}
  bootScript={["whoami", "ls", "neofetch"]}
/>`;

export default function TerminalEmulatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Terminal Emulator
          </h1>
          <Badge variant="primary">3 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A browser-based terminal with a boot typing animation, arrow-key
          command history, Tab autocomplete for commands and paths, a simulated
          filesystem, six color themes, and a draggable resize handle — every
          line is typed out live, and there is no backend anywhere in sight.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Full Terminal</h3>
            <p className="text-sm text-muted-foreground">Complete terminal with boot animation, themes, and resize handle.</p>
          </div>
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
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Custom Commands</h3>
            <p className="text-sm text-muted-foreground">Inject custom commands via the commands prop.</p>
          </div>
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
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Virtual Filesystem</h3>
            <p className="text-sm text-muted-foreground">Custom filesystem with ls, cd, and cat commands.</p>
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">username</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;user&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">hostname</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;localhost&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">400</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">theme</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">commands</td>
                <td className="px-4 py-3 text-muted-foreground">Command[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">fs</td>
                <td className="px-4 py-3 text-muted-foreground">FileSystemNode</td>
                <td className="px-4 py-3 text-muted-foreground">defaultFs</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">welcome</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">bootScript</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
