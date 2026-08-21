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

const TERMINAL_HEADER_SOURCE = `"use client";

import type { TermTheme } from "./TerminalEmulator.types";
import { TerminalIcon, CopyIcon, CheckIcon, TrashIcon, PaletteIcon } from "./TerminalEmulator.icons";

const actionBtn =
  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20";

export function TerminalEmulatorHeader({ theme, username, hostname, copied, onCopy, onCycleTheme, onClear }) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b px-4 py-2.5 backdrop-blur-sm" style={{ background: theme.header, borderColor: theme.border }}>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57] transition-transform hover:scale-110" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e] transition-transform hover:scale-110" />
        <span className="h-3 w-3 rounded-full bg-[#28c840] transition-transform hover:scale-110" />
      </div>
      <span className="ml-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider" style={{ color: theme.dim }}>
        <TerminalIcon className="h-3.5 w-3.5" />
        {username}@{hostname}
        <span className="opacity-50">&mdash;</span>
        <span className="opacity-70">{theme.label}</span>
      </span>
      <div className="ml-auto flex items-center gap-0.5">
        <button type="button" title="Copy transcript" aria-label="Copy transcript" onClick={onCopy} className={actionBtn} style={{ color: theme.dim }}>
          {copied ? <CheckIcon className="h-4 w-4" style={{ color: theme.success }} /> : <CopyIcon className="h-4 w-4" />}
        </button>
        <button type="button" title="Cycle theme" aria-label="Cycle theme" onClick={onCycleTheme} className={actionBtn} style={{ color: theme.dim }}>
          <PaletteIcon className="h-4 w-4" />
        </button>
        <button type="button" title="Clear screen (Ctrl+L)" aria-label="Clear screen" onClick={onClear} className={actionBtn} style={{ color: theme.dim }}>
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}`;

const TERMINAL_BODY_SOURCE = `"use client";

import { type RefObject } from "react";
import type { TranscriptLine, TermSpan, TermTheme } from "./TerminalEmulator.types";
import { resolveColor } from "./TerminalEmulator.themes";

function renderSpans(spans, theme, fallback) {
  const resolved = spans.length ? spans : [{ text: fallback }];
  return resolved.map((s, i) => {
    let color = theme.fg;
    if (s.color === "accent") color = theme.accent;
    else if (s.color === "success") color = theme.success;
    else if (s.color === "warn") color = theme.warn;
    else if (s.color === "error") color = theme.error;
    else if (s.color === "dim") color = theme.dim;
    else if (s.color === "bright") color = theme.fg;
    else if (s.color && s.color.startsWith("#")) color = s.color;
    return <span key={i} style={{ color, opacity: s.dim ? 0.7 : 1, fontWeight: s.bold ? 600 : 400 }}>{s.text}</span>;
  });
}

export function TerminalEmulatorBody({ lines, typingLine, promptSpans, buffer, busy, focused, theme, onBufferChange, onKeyDown, onFocus, onBlur, bodyRef, inputRef }) {
  return (
    <div ref={bodyRef} onPointerDown={() => inputRef.current?.focus()} className="scrollbar-thin flex-1 select-text overflow-y-auto px-4 py-3.5 text-[13px] leading-relaxed outline-none" style={{ background: theme.bg, color: theme.fg }}>
      {lines.map((line) => line.kind === "prompt" ? (
        <div key={line.id} className="flex flex-wrap items-baseline whitespace-pre-wrap break-words">
          {renderSpans(line.spans, theme, "")}
          <span style={{ color: theme.fg }}>{line.raw ?? ""}</span>
        </div>
      ) : (
        <div key={line.id} className="whitespace-pre-wrap break-words">{renderSpans(line.spans, theme, "")}</div>
      ))}
      {typingLine && <div className="whitespace-pre-wrap break-words" style={{ color: typingLine.color ? resolveColor(typingLine.color, theme) : theme.fg }}>{typingLine.text}</div>}
      <div className="flex items-center gap-0">
        {renderSpans(promptSpans, theme, "")}
        <input ref={inputRef} value={buffer} onChange={(e) => onBufferChange(e.target.value)} onKeyDown={onKeyDown} onFocus={onFocus} onBlur={onBlur} readOnly={busy} disabled={busy} size={Math.max(1, Math.min(buffer.length + 1, 80))} spellCheck={false} autoComplete="off" autoCapitalize="off" autoCorrect="off" aria-label="Terminal input" className="min-w-0 border-0 bg-transparent p-0 font-mono text-[13px] leading-relaxed outline-none disabled:opacity-50" style={{ color: theme.fg, caretColor: theme.accent, maxWidth: "100%" }} />
        {!focused && <span className="animate-pulse" style={{ color: theme.fg, fontWeight: 300 }} aria-hidden="true">&#9613;</span>}
        {busy && <span className="ml-2 shrink-0 rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider" style={{ color: theme.dim }}>running</span>}
      </div>
    </div>
  );
}`;

const TERMINAL_CONTAINER_SOURCE = `// Main container — rounded-2xl, shadow-2xl shadow-black/20, resize handle with smooth transition
<div
  className={cn("relative flex flex-col overflow-hidden rounded-2xl border font-mono shadow-2xl shadow-black/20", className)}
  style={{ height: termHeight, borderColor: theme.border, boxShadow: \`0 0 0 1px \${theme.border}, 0 32px 64px -16px \${theme.border}88\` }}
>
  {/* ... header, body, mobile ... */}
  <div role="separator" aria-orientation="horizontal" className="group flex h-2.5 shrink-0 cursor-row-resize touch-none items-center justify-center border-t transition-colors">
    <div className="h-[3px] w-10 rounded-full transition-all duration-200 group-hover:h-[4px] group-hover:w-14" style={{ background: theme.dim, opacity: 0.4 }} />
  </div>
</div>`;

const MINIMAL_CODE = `import { TerminalEmulator } from "@/components/ui";

<TerminalEmulator
  username="ada"
  hostname="playground"
  height={400}
  boot={false}
/>`;

const CUSTOM_FS_CODE = `import { TerminalEmulator } from "@/components/ui";

const myFs = {
  type: "dir",
  children: {
    docs: { type: "dir", children: {
      "readme.md": { type: "file", content: "# My Project" },
    }},
  },
};

<TerminalEmulator
  fs={myFs}
  bootScript={["ls", "cat readme.md"]}
/>`;

const THEMES_CODE = `// 6 built-in themes: term, matrix, light, amber, cyber, ocean
// Switch via the palette button or 'theme <name>' command
import { TerminalEmulator } from "@/components/ui";

<TerminalEmulator theme="amber" boot={false} />`;

const CUSTOM_CMDS_CODE = `import { TerminalEmulator } from "@/components/ui";
import type { TerminalCommand } from "@/components/ui";

const myCommands: TerminalCommand[] = [
  {
    name: "greet",
    description: "Say hello",
    run: () => [{ spans: [{ text: "Hello, World!", color: "accent" }] }],
  },
];

<TerminalEmulator commands={myCommands} boot={false} />`;

export default function TerminalEmulatorPage() {
  return (
    <ComponentDocPage
      name="Terminal Emulator"
      category="Data Display"
      description="A browser-based terminal with boot typing animation, command history, Tab autocomplete, simulated filesystem, 6 color themes, and resize handle."
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
        source={TERMINAL_HEADER_SOURCE}
        filename="TerminalEmulatorHeader.tsx"
        defaultExpanded={false}
      />

      <SourceCodeViewer
        source={TERMINAL_BODY_SOURCE}
        filename="TerminalEmulatorBody.tsx"
        defaultExpanded={false}
      />

      <SourceCodeViewer
        source={TERMINAL_CONTAINER_SOURCE}
        filename="TerminalEmulator.tsx (container)"
        defaultExpanded={false}
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Minimal"
          description="Terminal without boot sequence."
          code={MINIMAL_CODE}
          filename="minimal.tsx"
        >
          <TerminalEmulator
            username="ada"
            hostname="playground"
            height={360}
            boot={false}
          />
        </ExampleBlock>

        <ExampleBlock
          title="Custom Filesystem"
          description="Seed the terminal with a bespoke file tree."
          code={CUSTOM_FS_CODE}
          filename="custom-fs.tsx"
        >
          <TerminalEmulator
            username="ada"
            hostname="playground"
            height={420}
            fs={customFs}
            welcome={welcomeBanner}
            bootScript={["ls", "cd projects", "cat terminal.tsx"]}
          />
        </ExampleBlock>

        <ExampleBlock
          title="Custom Commands"
          description="Register custom commands with the built-ins."
          code={CUSTOM_CMDS_CODE}
          filename="custom-commands.tsx"
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

        <ExampleBlock
          title="Themes"
          description="6 built-in themes. Switch via the palette button or 'theme' command."
          code={THEMES_CODE}
          filename="themes.tsx"
        >
          <TerminalEmulator
            username="ada"
            hostname="playground"
            height={420}
            theme="amber"
            bootScript={["whoami", "themes"]}
          />
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">480</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">theme</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;term&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">username</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;ada&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">hostname</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;playground&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">commands</td>
                <td className="px-4 py-3 text-muted-foreground">TerminalCommand[]</td>
                <td className="px-4 py-3 text-muted-foreground">&mdash;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">boot</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">bootScript</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[&quot;whoami&quot;, &quot;ls&quot;, &quot;neofetch&quot;]</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">welcome</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">fs</td>
                <td className="px-4 py-3 text-muted-foreground">FsNode</td>
                <td className="px-4 py-3 text-muted-foreground">built-in</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">autoFocus</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&mdash;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
