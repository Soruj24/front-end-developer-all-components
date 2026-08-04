import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const menubarIcons: RegistryEntry = entry({
  id: "menubar-icons",
  title: "With Icons",
  description: "Menubar items with leading icons.",
  source: `import { Menubar } from "@/components/_menubar";

function CopyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CutIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L4.939 4.939m7.061l-2.879-2.879M12 12l2.879-2.879" />
    </svg>
  );
}

function PasteIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

const items = [
  {
    key: "edit",
    label: "Edit",
    children: [
      { key: "cut", label: "Cut", icon: <CutIcon />, shortcut: "Ctrl+X" },
      { key: "copy", label: "Copy", icon: <CopyIcon />, shortcut: "Ctrl+C" },
      { key: "paste", label: "Paste", icon: <PasteIcon />, shortcut: "Ctrl+V" },
    ],
  },
];

export default function MenubarIcons() {
  return <Menubar items={items} />;
}`,
});
