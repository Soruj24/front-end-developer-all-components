import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const messageScrollerEmpty: RegistryEntry = entry({
  id: "message-scroller-empty",
  title: "Empty State",
  description: "Message scroller with empty state.",
  source: `import { MessageScroller } from "@/components/_message-scroller";

export default function MessageScrollerEmpty() {
  return (
    <MessageScroller
      className="h-64"
      emptyMessage="No messages yet. Start a conversation!"
    />
  );
}`,
});
