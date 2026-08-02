import type { Metadata } from "next";
import { PlaceholderPage, PlaceholderPanel } from "@/features/auth/components/account";

export const metadata: Metadata = { title: "Notifications" };

const ICON = "M12 3a5 5 0 0 1 5 5c0 6 2 7 2 7H5s2-1 2-7a5 5 0 0 1 5-5Zm-2 14a2 2 0 0 0 4 0";

export default function AccountNotifications() {
  return (
    <PlaceholderPage title="Notifications" subtitle="Stay up to date with your account.">
      <PlaceholderPanel
        icon={ICON}
        title="No notifications yet"
        body="Activity alerts, security notices, and updates about your components will appear here."
      />
    </PlaceholderPage>
  );
}
