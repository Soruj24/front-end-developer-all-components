import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const menubarDefault: RegistryEntry = entry({
  id: "menubar-default",
  title: "Default",
  description: "Default menubar with dropdown menus.",
  source: `import { Menubar } from "@/components/_menubar";

const items = [
  {
    key: "file",
    label: "File",
    children: [
      { key: "new-tab", label: "New Tab", shortcut: "Ctrl+T" },
      { key: "new-window", label: "New Window", shortcut: "Ctrl+N" },
      { key: "separator", label: "---" },
      { key: "print", label: "Print...", shortcut: "Ctrl+P" },
    ],
  },
  {
    key: "edit",
    label: "Edit",
    children: [
      { key: "undo", label: "Undo", shortcut: "Ctrl+Z" },
      { key: "redo", label: "Redo", shortcut: "Ctrl+Shift+Z" },
      { key: "separator", label: "---" },
      { key: "cut", label: "Cut", shortcut: "Ctrl+X" },
      { key: "copy", label: "Copy", shortcut: "Ctrl+C" },
      { key: "paste", label: "Paste", shortcut: "Ctrl+V" },
    ],
  },
  {
    key: "view",
    label: "View",
    children: [
      { key: "zoom-in", label: "Zoom In", shortcut: "Ctrl+=" },
      { key: "zoom-out", label: "Zoom Out", shortcut: "Ctrl+-" },
      { key: "separator", label: "---" },
      { key: "fullscreen", label: "Fullscreen", shortcut: "F11" },
    ],
  },
];

export default function MenubarDefault() {
  return <Menubar items={items} />;
}`,
});
