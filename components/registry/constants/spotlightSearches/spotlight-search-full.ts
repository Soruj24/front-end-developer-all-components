import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { defaultTrigger, spotlightIcons, withActionsBlock } from "./shared";

export const spotlightSearchFull: RegistryEntry = entry({
    id: "spotlight-search-full",
    title: "Full Search",
    description:
      "A macOS-style spotlight — instant filtering with highlighted matches, category sections, persisted recents, a Popular row, and complete keyboard navigation.",
    source: `import { useState } from "react";
import { SpotlightSearch } from "@/components/ui";

${spotlightIcons}

const items = [
  { id: "safari", label: "Safari", subtitle: "Browser", category: "Apps", keywords: ["web", "browse", "internet"], icon: CompassIcon(), popular: true },
  { id: "mail", label: "Mail", subtitle: "Email", category: "Apps", keywords: ["email", "inbox", "messages"], icon: MailIcon() },
  { id: "messages", label: "Messages", subtitle: "Chat", category: "Apps", keywords: ["chat", "imessage", "text"], icon: BubbleIcon(), popular: true },
  { id: "calendar", label: "Calendar", subtitle: "Schedule", category: "Apps", keywords: ["events", "schedule", "meetings"], icon: CalendarIcon() },
  { id: "notes", label: "Notes", subtitle: "Quick notes", category: "Apps", keywords: ["memo", "writing"], icon: NoteIcon() },
  { id: "figma", label: "Figma", subtitle: "Design", category: "Apps", keywords: ["design", "ui", "mockup"], icon: FigmaIcon() },
  { id: "spotify", label: "Spotify", subtitle: "Music", category: "Apps", keywords: ["music", "podcast", "audio"], icon: PlayIcon() },
  { id: "q3-report", label: "Q3 Report.pdf", subtitle: "Documents · 2.4 MB", category: "Files", keywords: ["pdf", "report", "quarter"], icon: FileIcon() },
  { id: "design-system", label: "Design System.fig", subtitle: "Design · Figma", category: "Files", keywords: ["figma", "design", "ui", "tokens"], icon: FigmaIcon(), popular: true },
  { id: "meeting-notes", label: "Meeting Notes.md", subtitle: "Documents · 12 KB", category: "Files", keywords: ["md", "notes", "markdown"], icon: NoteIcon() },
  { id: "budget-2026", label: "Budget 2026.xlsx", subtitle: "Finance · 84 KB", category: "Files", keywords: ["spreadsheet", "xlsx", "finance"], icon: ChartIcon() },
  { id: "landing-mockup", label: "Landing Page Mockup.fig", subtitle: "Design · Figma", category: "Files", keywords: ["figma", "landing", "hero"], icon: FigmaIcon() },
  { id: "new-document", label: "New Document", subtitle: "Create a blank document", category: "Actions", keywords: ["create", "add", "new"], shortcut: "N", icon: PlusIcon() },
  { id: "open-recent", label: "Open Recent", subtitle: "Jump back to a recent file", category: "Actions", keywords: ["history", "last", "files"], shortcut: "Shift+Cmd+O", icon: ClockIcon() },
  { id: "duplicate", label: "Duplicate", subtitle: "Copy the current selection", category: "Actions", keywords: ["copy", "clone"], shortcut: "Cmd+D", icon: DuplicateIcon() },
  { id: "rename", label: "Rename", subtitle: "Rename the selected item", category: "Actions", keywords: ["title", "relabel"], shortcut: "F2", icon: TypeIcon() },
  { id: "toggle-theme", label: "Toggle Dark Mode", subtitle: "Switch between light and dark", category: "Actions", keywords: ["dark", "light", "theme"], shortcut: "Opt+Cmd+D", icon: ThemeIcon(), popular: true },
  { id: "lock-screen", label: "Lock Screen", subtitle: "Require password to unlock", category: "Actions", keywords: ["security", "screen"], shortcut: "Ctrl+Cmd+Q", icon: LockIcon() },
  { id: "shut-down", label: "Shut Down", subtitle: "Power off this device", category: "Actions", keywords: ["power", "off", "exit"], icon: PowerIcon() },
];

${withActionsBlock}

${defaultTrigger}

export default function SpotlightSearchFull() {
  const [open, setOpen] = useState(false);
  const data = withActions(items);

  return (
    <div className="flex w-full flex-col items-center gap-4 py-6">
      <p className="text-sm text-muted-foreground">
        Press <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">Ctrl K</kbd> or use the button.
      </p>
      <TriggerButton label="Search everything" onOpen={() => setOpen(true)} />
      <SpotlightSearch items={data} open={open} onOpenChange={setOpen} storageKey="demo:spotlight-search-full" />
    </div>
  );
}`,
  });
