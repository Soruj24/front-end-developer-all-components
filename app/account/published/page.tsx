import type { Metadata } from "next";
import { PlaceholderPage, PlaceholderPanel } from "@/features/auth/components/account";

export const metadata: Metadata = {
  title: "Published",
  description: "Components you have published to the registry.",
};

const ICON = "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3";

export default function AccountPublished() {
  return (
    <PlaceholderPage title="Published" subtitle="Components live on the registry.">
      <PlaceholderPanel
        icon={ICON}
        title="Nothing published yet"
        body="Components you publish to the registry will appear here, ready for the community to copy and install."
      />
    </PlaceholderPage>
  );
}
