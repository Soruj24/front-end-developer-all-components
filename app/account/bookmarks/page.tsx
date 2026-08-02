import type { Metadata } from "next";
import { PlaceholderPage, PlaceholderPanel } from "@/features/auth/components/account";

export const metadata: Metadata = { title: "Bookmarks" };

const ICON = "M12 5l2.5 5 5.5.8-4 3.9.9 5.5L12 17.9 7.1 20.2l.9-5.5-4-3.9L9.5 10 12 5Z";

export default function AccountBookmarks() {
  return (
    <PlaceholderPage title="Bookmarks" subtitle="Components you have saved for later.">
      <PlaceholderPanel
        icon={ICON}
        title="No bookmarks yet"
        body="Bookmark components across the library and they will show up here for quick access."
      />
    </PlaceholderPage>
  );
}
