import type { Metadata } from "next";
import { PlaceholderPage, PlaceholderPanel } from "@/features/auth/components/account";

export const metadata: Metadata = {
  title: "My Components",
  description: "Components you have published or drafted.",
};

const ICON = "M21 8l-9-5-9 5v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v9";

export default function AccountComponents() {
  return (
    <PlaceholderPage title="My Components" subtitle="Everything you have built.">
      <PlaceholderPanel
        icon={ICON}
        title="No components yet"
        body="Components you build and save will appear here — including drafts and published work."
      />
    </PlaceholderPage>
  );
}
