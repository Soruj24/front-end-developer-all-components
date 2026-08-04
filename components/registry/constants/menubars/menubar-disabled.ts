import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const menubarDisabled: RegistryEntry = entry({
  id: "menubar-disabled",
  title: "Disabled Items",
  description: "Menubar with disabled items.",
  source: `import { Menubar } from "@/components/_menubar";

const items = [
  {
    key: "edit",
    label: "Edit",
    children: [
      { key: "undo", label: "Undo", shortcut: "Ctrl+Z", disabled: true },
      { key: "redo", label: "Redo", shortcut: "Ctrl+Shift+Z", disabled: true },
      { key: "separator", label: "---" },
      { key: "cut", label: "Cut", shortcut: "Ctrl+X" },
      { key: "copy", label: "Copy", shortcut: "Ctrl+C" },
    ],
  },
];

export default function MenubarDisabled() {
  return <Menubar items={items} />;
}`,
});
