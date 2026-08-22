import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutTerminal: RegistryEntry = entry({
    id: "layout-terminal",
    title: "Terminal",
    description: "Console-style panel with prompt rows.",
    source: `import { TerminalIcon } from "lucide-react";

export default function LayoutTerminal() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="w-full">
        <div className="flex h-8 shrink-0 items-center justify-between border-b border-border bg-muted/40 px-3">
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <TerminalIcon className="h-3 w-3" aria-hidden="true" /> zsh
          </span>
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-primary/40" />
          </span>
        </div>
        <div className="space-y-1 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
          <p><span className="text-primary">~</span> npm run dev</p>
          <p>ready in 240ms</p>
          <p>
            <span className="text-primary">~</span>{" "}
            <span
              className="inline-block h-3 w-1.5 translate-y-0.5 animate-pulse rounded-sm bg-muted-foreground/60"
              aria-hidden="true"
            />
          </p>
        </div>
      </div>
    </div>
  );
}`,
  });
