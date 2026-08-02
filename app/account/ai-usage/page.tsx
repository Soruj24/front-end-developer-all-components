import type { Metadata } from "next";
import { PlaceholderPage, PlaceholderPanel } from "@/features/auth/components/account";

export const metadata: Metadata = {
  title: "AI Usage",
  description: "Your AI tool usage and token spend.",
};

const ICON = "M9.9 3.5l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9.9-2.2ZM18 14l.7 1.8 1.8.7-1.8.7L18 19l-.7-1.8-1.8-.7 1.8-.7L18 14ZM6 14l.5 1.3 1.3.5-1.3.5L6 17.6l-.5-1.3-1.3-.5 1.3-.5L6 14Z";

export default function AccountAiUsage() {
  return (
    <PlaceholderPage title="AI Usage" subtitle="Monitor your AI tool usage and limits.">
      <PlaceholderPanel
        icon={ICON}
        title="No usage yet"
        body="Your AI assistant usage, token spend, and model limits will appear here as you build with AI tools."
      />
    </PlaceholderPage>
  );
}
