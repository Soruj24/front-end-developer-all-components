import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutMobileChat: RegistryEntry = entry({
    id: "layout-mobile-chat",
    title: "Mobile Chat",
    description: "Mobile chat screen with composer pinned to the bottom.",
    source: `import { InboxIcon, PaperclipIcon, SendIcon } from "lucide-react";

const chatThread = [
  { mine: false, text: "Standup in five?" },
  { mine: true, text: "Give me ten — shipping the fix." },
  { mine: false, text: "Perfect 👍" },
];

export default function LayoutMobileChat() {
  return (
    <div className="mx-auto flex h-48 w-full max-w-56 overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex w-full flex-col">
        <header className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-2 py-1.5">
          <InboxIcon className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
          <span className="text-[11px] font-medium">Alex</span>
        </header>
        <div className="flex flex-1 flex-col justify-end gap-1 p-2">
          {chatThread.map(({ mine, text }, i) => (
            <p
              key={i}
              className={\`max-w-[85%] rounded-lg px-2 py-1 text-[11px] \${
                mine
                  ? "self-end bg-primary text-primary-foreground"
                  : "self-start bg-muted text-foreground"
              }\`}
            >
              {text}
            </p>
          ))}
        </div>
        <footer className="flex items-center gap-1 border-t border-border p-1.5">
          <PaperclipIcon className="h-3 w-3 shrink-0 text-muted-foreground/60" aria-hidden="true" />
          <span className="flex-1 rounded-full bg-muted px-2 py-1 text-[10px] text-muted-foreground/60">
            Message…
          </span>
          <button
            type="button"
            aria-label="Send message"
            className="rounded-full bg-primary p-1 text-primary-foreground shadow-xs transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <SendIcon className="h-3 w-3" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </div>
  );
}`,
  });
