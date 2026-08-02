import type { Metadata } from "next";
import { PlaceholderPage, PlaceholderPanel } from "@/features/auth/components/account";

export const metadata: Metadata = { title: "Collections" };

const ICON = "M4 5h6l2 2h8v12H4V5Z";

export default function AccountCollections() {
  return (
    <PlaceholderPage title="Collections" subtitle="Organize components your way.">
      <PlaceholderPanel
        icon={ICON}
        title="No collections yet"
        body="Group related components into collections to keep your library organized."
      />
    </PlaceholderPage>
  );
}
