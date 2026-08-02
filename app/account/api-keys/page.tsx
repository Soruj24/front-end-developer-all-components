import type { Metadata } from "next";
import { PlaceholderPage, PlaceholderPanel } from "@/features/auth/components/account";

export const metadata: Metadata = { title: "API Keys" };

const ICON = "M14 10l2 2m0-5 3 3M4 20l5-5m3-3 4-4 3 3-4 4-3-3Z";

export default function AccountApiKeys() {
  return (
    <PlaceholderPage title="API Keys" subtitle="Scoped tokens for the registry API and CLI.">
      <PlaceholderPanel
        icon={ICON}
        title="No API keys yet"
        body="Create scoped keys to authenticate with the registry API and CLI. Keys are shown once at creation."
      />
    </PlaceholderPage>
  );
}
