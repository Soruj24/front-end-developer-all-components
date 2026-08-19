"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import CommandMenu from "@/components/ui/CommandMenu";

const COMMANDMENU_SOURCE = `import { CommandMenuProps } from "@/components/ui/CommandMenu";

const CommandMenu = ({ open, onClose, groups, placeholder }: CommandMenuProps) => {
  // Renders a modal with grouped, filterable command items.
  // Supports keyboard navigation, danger items, and shortcuts.
};`;

const GROUPED_SOURCE = `import { useState } from "react";
import CommandMenu from "@/components/ui/CommandMenu";

export default function GroupedDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Search Commands</button>
      <CommandMenu
        open={open}
        onClose={() => setOpen(false)}
        groups={[
          { group: "Navigation", items: [
            { id: "home", label: "Go Home", shortcut: "G H", onSelect: () => {} },
            { id: "settings", label: "Settings", shortcut: "G S", onSelect: () => {} },
          ]},
          { group: "Actions", items: [
            { id: "copy", label: "Copy", shortcut: "Cmd+C", onSelect: () => {} },
            { id: "paste", label: "Paste", shortcut: "Cmd+V", onSelect: () => {} },
          ]},
        ]}
      />
    </>
  );
}`;

const DANGER_SOURCE = `import { useState } from "react";
import CommandMenu from "@/components/ui/CommandMenu";

export default function DangerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Type command...</button>
      <CommandMenu
        open={open}
        onClose={() => setOpen(false)}
        groups={[
          { group: "Actions", items: [
            { id: "save", label: "Save Changes", shortcut: "Cmd+S", onSelect: () => {} },
          ]},
          { group: "Danger Zone", items: [
            { id: "delete", label: "Delete Project", onSelect: () => {}, danger: true },
          ]},
        ]}
      />
    </>
  );
}`;

const TRIGGER = "inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-muted";

const ALL_GROUPS = [
  { group: "Navigation", items: [
    { id: "home", label: "Go to Home", shortcut: "G H", onSelect: () => alert("Home") },
    { id: "settings", label: "Open Settings", shortcut: "G S", onSelect: () => alert("Settings") },
    { id: "profile", label: "View Profile", shortcut: "G P", onSelect: () => alert("Profile") },
  ]},
  { group: "File", items: [
    { id: "new-file", label: "New File", shortcut: "N", onSelect: () => alert("New File") },
    { id: "save", label: "Save", shortcut: "Cmd+S", onSelect: () => alert("Saved") },
  ]},
  { group: "Edit", items: [
    { id: "copy", label: "Copy", shortcut: "Cmd+C", onSelect: () => alert("Copied") },
    { id: "paste", label: "Paste", shortcut: "Cmd+V", onSelect: () => alert("Pasted") },
  ]},
];

const DANGER_GROUPS = [
  { group: "Actions", items: [
    { id: "save", label: "Save Changes", shortcut: "Cmd+S", onSelect: () => alert("Saved") },
  ]},
  { group: "Danger Zone", items: [
    { id: "delete", label: "Delete Project", onSelect: () => alert("Deleted"), danger: true },
    { id: "reset", label: "Reset All", onSelect: () => alert("Reset"), danger: true },
  ]},
];

export default function CommandMenuPage() {
  const [openBasic, setOpenBasic] = useState(false);
  const [openGrouped, setOpenGrouped] = useState(false);
  const [openDanger, setOpenDanger] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);

  return (
    <ComponentDocPage
      name="Command Menu"
      category="Overlays"
      description="A searchable command palette with keyboard navigation, grouped results, and shortcut display. Supports filtering, danger actions, and custom placeholders."
    >
      <PreviewPanel filename="command-menu-preview.tsx">
        <div className="flex flex-col items-center gap-4">
          <button className={TRIGGER} onClick={() => setOpenBasic(true)}>Search commands...</button>
          <CommandMenu open={openBasic} onClose={() => setOpenBasic(false)} groups={ALL_GROUPS} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={COMMANDMENU_SOURCE} filename="components/ui/CommandMenu.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Grouped Commands" description="Commands organized into labeled groups with keyboard shortcuts." code={GROUPED_SOURCE} filename="grouped-demo.tsx">
          <div className="flex flex-col items-center gap-4">
            <button className={TRIGGER} onClick={() => setOpenGrouped(true)}>Search commands...</button>
            <CommandMenu open={openGrouped} onClose={() => setOpenGrouped(false)} groups={ALL_GROUPS} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Danger Actions" description="Mark items as danger for destructive operations with distinct styling." code={DANGER_SOURCE} filename="danger-demo.tsx">
          <div className="flex flex-col items-center gap-4">
            <button className={TRIGGER} onClick={() => setOpenDanger(true)}>Type command...</button>
            <CommandMenu open={openDanger} onClose={() => setOpenDanger(false)} groups={DANGER_GROUPS} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Custom Placeholder" description="Provide a custom placeholder to match your use case." code={GROUPED_SOURCE} filename="custom-placeholder.tsx">
          <div className="flex flex-col items-center gap-4">
            <button className={TRIGGER} onClick={() => setOpenCustom(true)}>Ask me anything...</button>
            <CommandMenu open={openCustom} onClose={() => setOpenCustom(false)} groups={ALL_GROUPS} placeholder="Ask me anything..." />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
