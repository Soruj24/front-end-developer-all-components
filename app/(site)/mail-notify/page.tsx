"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { MAIL_NOTIFY_SOURCE } from "./mail-notify-source";
import {
  EMAIL_CARD_EXAMPLE,
  NOTIFICATION_BADGE_EXAMPLE,
  MAIL_LIST_EXAMPLE,
  SEND_BUTTON_EXAMPLE,
  UNREAD_COUNT_EXAMPLE,
  NEWSLETTER_EXAMPLE,
  MAIL_FILTER_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./mail-notify-examples";
import {
  EmailCard,
  NotificationBadge,
  MailList,
  SendButton,
  UnreadCount,
  Newsletter,
  MailFilter,
  PlaygroundDemo,
} from "./demos";

export default function MailNotifyPage() {
  return (
    <ComponentDocPage
      name="Mail Notify"
      category="Feedback"
      description="Email and notification components including email cards, notification badges, mail lists, send buttons, unread counts, and newsletter subscriptions."
    >
      <PreviewPanel filename="mail-notify.tsx">
        <EmailCard />
      </PreviewPanel>

      <SourceCodeViewer
        source={MAIL_NOTIFY_SOURCE}
        filename="components/ui/MailCard/MailCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all mail notify variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Email Card" description="Email item with unread indicator." code={EMAIL_CARD_EXAMPLE}>
          <EmailCard />
        </ExampleBlock>
        <ExampleBlock title="Notification Badge" description="Bell with unread count badge and mute toggle." code={NOTIFICATION_BADGE_EXAMPLE}>
          <NotificationBadge />
        </ExampleBlock>
        <ExampleBlock title="Mail List" description="Selectable list of emails with avatars." code={MAIL_LIST_EXAMPLE}>
          <MailList />
        </ExampleBlock>
        <ExampleBlock title="Send Button" description="Send action with loading and success states." code={SEND_BUTTON_EXAMPLE}>
          <SendButton />
        </ExampleBlock>
        <ExampleBlock title="Unread Count" description="Track and toggle unread messages." code={UNREAD_COUNT_EXAMPLE}>
          <UnreadCount />
        </ExampleBlock>
        <ExampleBlock title="Newsletter" description="Email subscription form with success state." code={NEWSLETTER_EXAMPLE}>
          <Newsletter />
        </ExampleBlock>
        <ExampleBlock title="Mail Filter" description="Filter emails by read status." code={MAIL_FILTER_EXAMPLE}>
          <MailFilter />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
