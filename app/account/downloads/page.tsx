import type { Metadata } from "next";
import { PlaceholderPage, PlaceholderPanel } from "@/features/auth/components/account";

export const metadata: Metadata = { title: "Downloads" };

const ICON = "M12 3v12m0 0 4-4m-4 4-4-4M4 21h16";

export default function AccountDownloads() {
  return (
    <PlaceholderPage title="Downloads" subtitle="Components you have installed.">
      <PlaceholderPanel
        icon={ICON}
        title="No downloads yet"
        body="Components you download or install via the CLI will appear here with version history."
      />
    </PlaceholderPage>
  );
}
