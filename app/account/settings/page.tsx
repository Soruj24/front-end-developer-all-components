import type { Metadata } from "next";
import { PlaceholderPage, PlaceholderPanel } from "@/features/auth/components/account";

export const metadata: Metadata = { title: "Settings" };

const ICON = "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-3a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.9a7 7 0 0 0-2-1.2L14 3h-4l-.4 2.5a7 7 0 0 0-2 1.2l-2.4-.9-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-.9a7 7 0 0 0 2 1.2L10 21h4l.4-2.5a7 7 0 0 0 2-1.2l2.4.9 2-3.4-2-1.6c.06-.4.1-.8.1-1.2Z";

export default function AccountSettings() {
  return (
    <PlaceholderPage title="Settings" subtitle="Preferences for your account and workspace.">
      <PlaceholderPanel
        icon={ICON}
        title="Settings coming soon"
        body="Language, editor preferences, and workspace defaults will live here."
      />
    </PlaceholderPage>
  );
}
