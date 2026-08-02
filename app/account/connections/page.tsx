import type { Metadata } from "next";
import { PlaceholderPage, PlaceholderPanel } from "@/features/auth/components/account";

export const metadata: Metadata = { title: "Connected accounts" };

const ICON = "M10 13a4 4 0 0 0 4 4h3a4 4 0 0 0 0-8h-3m-4 2a4 4 0 0 0-4-4H3a4 4 0 0 0 0 8h3";

export default function AccountConnections() {
  return (
    <PlaceholderPage title="Connected accounts" subtitle="OAuth providers linked to your identity.">
      <PlaceholderPanel
        icon={ICON}
        title="No connected accounts"
        body="Sign in with GitHub or Google to link third-party providers to your account."
      />
    </PlaceholderPage>
  );
}
