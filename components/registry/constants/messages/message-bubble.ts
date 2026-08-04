import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const messageBubble: RegistryEntry = entry({
  id: "message-bubble",
  title: "Bubble",
  description: "Message with bubble variant.",
  source: `import { Message } from "@/components/_message";

export default function MessageBubble() {
  return (
    <div className="flex flex-col gap-3">
      <Message variant="bubble" position="received" author="Alice">
        This is a bubble message!
      </Message>
      <Message variant="bubble" position="sent">
        Looks great!
      </Message>
    </div>
  );
}`,
});
