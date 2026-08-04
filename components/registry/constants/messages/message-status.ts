import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const messageStatus: RegistryEntry = entry({
  id: "message-status",
  title: "Status",
  description: "Message with delivery status indicators.",
  source: `import { Message } from "@/components/_message";

export default function MessageStatus() {
  return (
    <div className="flex flex-col gap-3">
      <Message position="sent" status="sent" timestamp="2:30 PM">
        Message sent
      </Message>
      <Message position="sent" status="delivered" timestamp="2:31 PM">
        Message delivered
      </Message>
      <Message position="sent" status="read" timestamp="2:32 PM">
        Message read
      </Message>
    </div>
  );
}`,
});
