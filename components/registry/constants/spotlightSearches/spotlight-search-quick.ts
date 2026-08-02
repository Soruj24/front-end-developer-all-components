import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { defaultTrigger, spotlightIcons, withActionsBlock } from "./shared";

export const spotlightSearchQuick: RegistryEntry = entry({
    id: "spotlight-search-quick",
    title: "Quick Launch",
    description:
      "A compact runner — narrower panel, custom placeholder, and a small flat set of apps and actions for fast launching.",
    source: `import { useState } from "react";
import { SpotlightSearch } from "@/components/ui";

${spotlightIcons}

const quick = [
  { id: "safari", label: "Safari", subtitle: "Browser", category: "Apps", icon: CompassIcon() },
  { id: "mail", label: "Mail", subtitle: "Email", category: "Apps", icon: MailIcon() },
  { id: "messages", label: "Messages", subtitle: "Chat", category: "Apps", icon: BubbleIcon() },
  { id: "figma", label: "Figma", subtitle: "Design", category: "Apps", icon: FigmaIcon() },
  { id: "new-document", label: "New Document", subtitle: "Create a blank document", category: "Actions", shortcut: "N", icon: PlusIcon() },
  { id: "toggle-theme", label: "Toggle Dark Mode", subtitle: "Switch between light and dark", category: "Actions", shortcut: "Opt+Cmd+D", icon: ThemeIcon(), popular: true },
  { id: "lock-screen", label: "Lock Screen", subtitle: "Require password to unlock", category: "Actions", shortcut: "Ctrl+Cmd+Q", icon: LockIcon() },
];

${withActionsBlock}

${defaultTrigger}

export default function SpotlightSearchQuick() {
  const [open, setOpen] = useState(false);
  const data = withActions(quick);

  return (
    <div className="flex w-full flex-col items-center gap-4 py-6">
      <TriggerButton label="Launch quickly" onOpen={() => setOpen(true)} />
      <SpotlightSearch
        items={data}
        open={open}
        onOpenChange={setOpen}
        placeholder="Type an app or action..."
        width={440}
        maxHeight={340}
        storageKey="demo:spotlight-search-quick"
      />
    </div>
  );
}`,
  });
