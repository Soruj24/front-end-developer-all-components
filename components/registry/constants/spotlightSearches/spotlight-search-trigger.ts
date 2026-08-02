import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { spotlightIcons, withActionsBlock } from "./shared";

export const spotlightSearchTrigger: RegistryEntry = entry({
    id: "spotlight-search-trigger",
    title: "Search-Bar Trigger",
    description:
      "Any element can open it — here the spotlight launches from a search-bar styled button, with the global shortcut disabled.",
    source: `import { useState } from "react";
import { SpotlightSearch } from "@/components/ui";

${spotlightIcons}

const items = [
  { id: "safari", label: "Safari", subtitle: "Browser", category: "Apps", icon: CompassIcon() },
  { id: "messages", label: "Messages", subtitle: "Chat", category: "Apps", icon: BubbleIcon() },
  { id: "calendar", label: "Calendar", subtitle: "Schedule", category: "Apps", icon: CalendarIcon() },
  { id: "notes", label: "Notes", subtitle: "Quick notes", category: "Apps", icon: NoteIcon() },
  { id: "figma", label: "Figma", subtitle: "Design", category: "Apps", icon: FigmaIcon() },
  { id: "q3-report", label: "Q3 Report.pdf", subtitle: "Documents · 2.4 MB", category: "Files", icon: FileIcon() },
  { id: "design-system", label: "Design System.fig", subtitle: "Design · Figma", category: "Files", icon: FigmaIcon() },
  { id: "meeting-notes", label: "Meeting Notes.md", subtitle: "Documents · 12 KB", category: "Files", icon: NoteIcon() },
  { id: "new-document", label: "New Document", subtitle: "Create a blank document", category: "Actions", icon: PlusIcon() },
  { id: "toggle-theme", label: "Toggle Dark Mode", subtitle: "Switch between light and dark", category: "Actions", icon: ThemeIcon(), popular: true },
  { id: "lock-screen", label: "Lock Screen", subtitle: "Require password to unlock", category: "Actions", icon: LockIcon() },
];

${withActionsBlock}

export default function SpotlightSearchTrigger() {
  const [open, setOpen] = useState(false);
  const data = withActions(items);

  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full max-w-md items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground shadow-card transition-colors hover:border-ring/60 hover:text-foreground"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
        </svg>
        <span className="flex-1 text-left">Search apps, files, actions…</span>
        <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">Ctrl K</kbd>
      </button>
      <p className="text-xs text-subtle">Built-in shortcut disabled — the trigger controls when it opens.</p>
      <SpotlightSearch
        items={data}
        open={open}
        onOpenChange={setOpen}
        bindShortcut={false}
        storageKey="demo:spotlight-search-trigger"
      />
    </div>
  );
}`,
  });
