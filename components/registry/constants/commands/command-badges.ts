import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const commandBadges: RegistryEntry = entry({
  id: "command-badges",
  title: "Command with Badges",
  description: "Mail items with count badges.",
  source: `import { Command } from "@/components/_command";

const items = [
  { value: "inbox", label: "Inbox", icon: <InboxIcon />, shortcut: "12" },
  { value: "drafts", label: "Drafts", icon: <MailIcon />, shortcut: "3" },
  { value: "sent", label: "Sent", icon: <SendIcon /> },
  { value: "archive", label: "Archive", icon: <ArchiveIcon /> },
  { value: "spam", label: "Spam", icon: <AlertIcon />, shortcut: "2" },
];

export default function CommandBadges() {
  return (
    <Command
      items={items}
      placeholder="Search mail..."
    />
  );
}`,
  files: ["components/_command/Command.tsx"],
  dependencies: ["react"],
});
