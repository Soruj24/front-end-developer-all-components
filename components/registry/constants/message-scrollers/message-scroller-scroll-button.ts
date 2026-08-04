import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const messageScrollerScrollButton: RegistryEntry = entry({
  id: "message-scroller-scroll-button",
  title: "Scroll Button",
  description: "Message scroller with scroll-to-bottom button.",
  source: `import { MessageScroller } from "@/components/_message-scroller";
import { Message } from "@/components/_message";

export default function MessageScrollerScrollButton() {
  return (
    <MessageScroller className="h-64" showScrollButton>
      <Message position="received" author="Alice">Old message</Message>
      <Message position="sent" author="You">Reply</Message>
      <Message position="received" author="Alice">Another message</Message>
      <Message position="sent" author="You">Another reply</Message>
      <Message position="received" author="Alice">Latest message</Message>
    </MessageScroller>
  );
}`,
});
