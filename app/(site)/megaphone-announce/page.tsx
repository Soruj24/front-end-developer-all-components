"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { MEGAPHONE_ANNOUNCE_SOURCE } from "./megaphone-announce-source";
import {
  ANNOUNCEMENT_BANNER_EXAMPLE,
  ALERT_NOTIFICATION_EXAMPLE,
  BROADCAST_MESSAGE_EXAMPLE,
  PROMOTION_CARD_EXAMPLE,
  NEWS_FLASH_EXAMPLE,
  STATUS_UPDATE_EXAMPLE,
  EVENT_ALERT_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./megaphone-announce-examples";
import {
  AnnouncementBanner,
  AlertNotification,
  BroadcastMessage,
  PromotionCard,
  NewsFlash,
  StatusUpdate,
  EventAlert,
  PlaygroundDemo,
} from "./demos";

export default function MegaphoneAnnouncePage() {
  return (
    <ComponentDocPage
      name="Megaphone Announce"
      category="Communication"
      description="Announcement and notification components including banners, alerts, broadcasts, promotions, and event alerts for effective communication."
    >
      <PreviewPanel filename="megaphone-announce.tsx">
        <AnnouncementBanner />
      </PreviewPanel>

      <SourceCodeViewer
        source={MEGAPHONE_ANNOUNCE_SOURCE}
        filename="components/ui/MegaphoneAnnounce/AnnouncementBanner.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all megaphone announce variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Announcement Banner" description="Dismissible announcement with gradient background and CTA buttons." code={ANNOUNCEMENT_BANNER_EXAMPLE}>
          <AnnouncementBanner />
        </ExampleBlock>
        <ExampleBlock title="Alert Notification" description="Color-coded alerts for warning, info, and success states." code={ALERT_NOTIFICATION_EXAMPLE}>
          <AlertNotification />
        </ExampleBlock>
        <ExampleBlock title="Broadcast Message" description="Send messages across multiple channels with character preview." code={BROADCAST_MESSAGE_EXAMPLE}>
          <BroadcastMessage />
        </ExampleBlock>
        <ExampleBlock title="Promotion Card" description="Promotional card with copy-to-clipboard promo code and discount apply." code={PROMOTION_CARD_EXAMPLE}>
          <PromotionCard />
        </ExampleBlock>
        <ExampleBlock title="News Flash" description="Breaking news banner with category tags and time indicators." code={NEWS_FLASH_EXAMPLE}>
          <NewsFlash />
        </ExampleBlock>
        <ExampleBlock title="Status Update" description="User status selector with avatar and online/away/busy indicators." code={STATUS_UPDATE_EXAMPLE}>
          <StatusUpdate />
        </ExampleBlock>
        <ExampleBlock title="Event Alert" description="Event list with time display and toggle-able reminders." code={EVENT_ALERT_EXAMPLE}>
          <EventAlert />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
