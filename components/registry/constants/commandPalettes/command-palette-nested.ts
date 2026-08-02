import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paletteIcons, triggerButton, withActionsBlock } from "./shared";

export const commandPaletteNested: RegistryEntry = entry({
    id: "command-palette-nested",
    title: "Nested Commands",
    description:
      "Drill into submenus with Enter or ArrowRight, go back with Backspace / ArrowLeft / Esc, and jump via the breadcrumb trail.",
    source: `import { useState } from "react";
import { CommandPalette } from "@/components/ui";

${paletteIcons}

const commands = [
  {
    id: "go-to",
    label: "Go To",
    keywords: ["navigate", "jump", "open"],
    shortcut: "G",
    icon: DashboardIcon(),
    children: [
      { id: "go-dashboard", label: "Dashboard", keywords: ["home", "overview"], shortcut: "G D", icon: DashboardIcon() },
      { id: "go-analytics", label: "Analytics", keywords: ["stats", "charts"], shortcut: "G A", icon: ChartIcon() },
      { id: "go-reports", label: "Reports", keywords: ["export", "pdf"], shortcut: "G R", icon: FileIcon() },
      { id: "go-settings", label: "Settings", keywords: ["preferences"], shortcut: "G S", icon: GearIcon() },
    ],
  },
  {
    id: "create",
    label: "Create",
    keywords: ["new", "add", "make"],
    shortcut: "C",
    icon: PlusIcon(),
    children: [
      { id: "create-note", label: "Quick Note", keywords: ["memo"], shortcut: "C N", icon: NoteIcon() },
      { id: "create-task", label: "Task", keywords: ["todo"], shortcut: "C T", icon: ClipboardIcon() },
      { id: "create-folder", label: "Folder", keywords: ["dir"], shortcut: "C F", icon: FolderIcon() },
    ],
  },
  {
    id: "insert",
    label: "Insert",
    keywords: ["add", "embed"],
    shortcut: "I",
    icon: PlusIcon(),
    children: [
      { id: "insert-image", label: "Image", keywords: ["photo", "picture"], icon: FileIcon() },
      { id: "insert-link", label: "Link", keywords: ["url", "hyperlink"], icon: CopyIcon() },
      { id: "insert-divider", label: "Divider", keywords: ["hr", "line"], icon: TypeIcon() },
    ],
  },
];

${withActionsBlock}

${triggerButton}

export default function CommandPaletteNested() {
  const [open, setOpen] = useState(false);
  const items = withActions(commands);

  return (
    <div className="flex w-full flex-col items-center gap-4 py-6">
      <p className="text-sm text-muted-foreground">
        Use <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">→</kbd> to drill in,{" "}
        <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">←</kbd> to go back.
      </p>
      <TriggerButton label="Nested commands" onOpen={() => setOpen(true)} />
      <CommandPalette
        items={items}
        open={open}
        onOpenChange={setOpen}
        storageKey="demo:command-palette-nested"
      />
    </div>
  );
}`,
  });
