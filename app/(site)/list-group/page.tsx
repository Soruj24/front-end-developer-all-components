"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { LIST_GROUP_SOURCE, BASIC_EXAMPLE, NOTIFICATIONS_EXAMPLE, BADGES_EXAMPLE, HORIZONTAL_EXAMPLE } from "./list-group-source";
import { MenuDemo, NotificationsDemo, BadgesDemo, HorizontalDemo, FooterDemo } from "./list-group-demos";

export default function ListGroupPage() {
  return (
    <ComponentDocPage
      name="List Group"
      category="Data Display"
      description="Grouped list items with icons, badges, and interactive states. Perfect for navigation menus, notification feeds, and settings panels."
    >
      <PreviewPanel filename="list-group-preview.tsx">
        <MenuDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={LIST_GROUP_SOURCE}
        filename="components/ui/ListGroup/ListGroup.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Notifications"
          description="Notification feed with unread indicators and a header action."
          code={NOTIFICATIONS_EXAMPLE}
          filename="notifications.tsx"
        >
          <NotificationsDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Badges"
          description="List items with count badges in different variants."
          code={BADGES_EXAMPLE}
          filename="badges.tsx"
        >
          <BadgesDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Horizontal / Pills"
          description="Horizontal layout for tab-style or filter pill navigation."
          code={HORIZONTAL_EXAMPLE}
          filename="horizontal.tsx"
        >
          <HorizontalDemo />
        </ExampleBlock>

        <ExampleBlock
          title="With Footer"
          description="List with a footer section."
          code={`<ListGroup items={items} footer={<p>End of list</p>} />`}
          filename="footer.tsx"
        >
          <FooterDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
