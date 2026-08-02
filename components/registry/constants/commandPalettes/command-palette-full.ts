import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paletteIcons, triggerButton, withActionsBlock } from "./shared";

export const commandPaletteFull: RegistryEntry = entry({
    id: "command-palette-full",
    title: "Raycast-Style Palette",
    description:
      "The full palette — Ctrl+K, global search with highlights, grouped commands, nested submenus, recents, favorites, pinned commands, and keyboard navigation.",
    source: `import { useState } from "react";
import { CommandPalette } from "@/components/ui";

${paletteIcons}

const commands = [
  { id: "home", label: "Go to Home", keywords: ["navigate", "start"], shortcut: "G H", group: "Navigation", icon: HomeIcon() },
  { id: "global-search", label: "Search Anything", keywords: ["find", "global", "spotlight"], shortcut: "/", group: "Navigation", icon: SearchIcon() },
  { id: "settings", label: "Open Settings", keywords: ["preferences"], shortcut: "G S", group: "Navigation", icon: GearIcon() },
  { id: "profile", label: "View Profile", keywords: ["account", "me"], shortcut: "G P", group: "Navigation", icon: UserIcon() },
  { id: "notifications", label: "Notifications", keywords: ["alerts", "bell"], shortcut: "G N", group: "Navigation", icon: BellIcon() },
  {
    id: "new-file",
    label: "New File",
    keywords: ["create", "add"],
    shortcut: "N",
    group: "Actions",
    icon: PlusIcon(),
    children: [
      { id: "new-ts", label: "TypeScript File", keywords: ["ts", "code"], group: "Actions", icon: FileIcon() },
      { id: "new-md", label: "Markdown File", keywords: ["md", "doc"], group: "Actions", icon: FileIcon() },
      { id: "new-folder", label: "New Folder", keywords: ["dir", "create"], group: "Actions", icon: FolderIcon() },
    ],
  },
  {
    id: "open-recent",
    label: "Open Recent",
    keywords: ["history", "last", "projects"],
    shortcut: "Cmd+O",
    group: "Actions",
    icon: ClockIcon(),
    children: [
      { id: "rec-atlas", label: "Project Atlas", keywords: ["recent", "project"], group: "Actions", icon: FolderIcon() },
      { id: "rec-design", label: "Design System", keywords: ["recent", "design"], group: "Actions", icon: FolderIcon() },
      { id: "rec-notes", label: "Meeting Notes", keywords: ["recent", "notes"], group: "Actions", icon: FileIcon() },
    ],
  },
  { id: "duplicate", label: "Duplicate Selection", keywords: ["copy"], shortcut: "Cmd+D", group: "Edit", icon: DuplicateIcon() },
  { id: "copy", label: "Copy", shortcut: "Cmd+C", group: "Edit", icon: CopyIcon() },
  { id: "paste", label: "Paste", shortcut: "Cmd+V", group: "Edit", icon: ClipboardIcon() },
  { id: "rename", label: "Rename", shortcut: "F2", group: "Edit", icon: TypeIcon() },
  { id: "theme", label: "Toggle Theme", keywords: ["dark", "light", "mode", "appearance"], shortcut: "Ctrl+Shift+T", group: "Appearance", icon: ThemeIcon(), pinned: true },
  { id: "font-in", label: "Increase Font Size", keywords: ["zoom", "bigger"], shortcut: "Cmd++", group: "Appearance", icon: TypeIcon() },
  { id: "font-out", label: "Decrease Font Size", keywords: ["zoom", "smaller"], shortcut: "Cmd+-", group: "Appearance", icon: TypeIcon() },
  { id: "clear-cache", label: "Clear Cache", keywords: ["memory", "storage", "reset"], group: "Maintenance", icon: RefreshIcon() },
  { id: "restart", label: "Restart App", keywords: ["reboot"], shortcut: "Ctrl+Cmd+R", group: "Maintenance", icon: RefreshIcon() },
  { id: "delete", label: "Delete Current Project", keywords: ["remove", "destroy"], group: "Maintenance", icon: TrashIcon(), danger: true },
];

${withActionsBlock}

${triggerButton}

export default function CommandPaletteFull() {
  const [open, setOpen] = useState(false);
  const items = withActions(commands);

  return (
    <div className="flex w-full flex-col items-center gap-4 py-6">
      <p className="text-sm text-muted-foreground">
        Press <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">Ctrl K</kbd> or use the button.
      </p>
      <TriggerButton label="Search commands" onOpen={() => setOpen(true)} />
      <CommandPalette
        items={items}
        open={open}
        onOpenChange={setOpen}
        storageKey="demo:command-palette-full"
      />
    </div>
  );
}`,
  });
