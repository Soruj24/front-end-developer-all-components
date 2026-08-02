import type { Metadata } from "next";
import { PlaceholderPage, PlaceholderPanel } from "@/features/auth/components/account";

export const metadata: Metadata = {
  title: "Drafts",
  description: "Components you have drafted but not published.",
};

const ICON = "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z";

export default function AccountDrafts() {
  return (
    <PlaceholderPage title="Drafts" subtitle="Unpublished work in progress.">
      <PlaceholderPanel
        icon={ICON}
        title="No drafts yet"
        body="Draft components you are working on will appear here. Start building and save as a draft anytime."
      />
    </PlaceholderPage>
  );
}
