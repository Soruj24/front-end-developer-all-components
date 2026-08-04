import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const messageScrollerDefault: RegistryEntry = entry({
  id: "message-scroller-default",
  title: "Default",
  description: "Default message scroller with auto-scroll.",
  source: `import { MessageScroller } from "@/components/_message-scroller";
import { Message } from "@/components/_message";

export default function MessageScrollerDefault() {
  return (
    <MessageScroller className="h-64">
      <Message position="received" author="Alice">Message 1</Message>
      <Message position="sent" author="You">Message 2</Message>
      <Message position="received" author="Alice">Message 3</Message>
      <Message position="sent" author="You">Message 4</Message>
      <Message position="received" author="Alice">Message 5</Message>
    </MessageScroller>
  );
}`,
});
