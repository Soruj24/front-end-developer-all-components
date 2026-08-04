import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const messageDefault: RegistryEntry = entry({
  id: "message-default",
  title: "Default",
  description: "Default message with author and timestamp.",
  source: `import { Message } from "@/components/_message";

export default function MessageDefault() {
  return (
    <div className="flex flex-col gap-3">
      <Message position="received" author="Alice" timestamp="2:30 PM">
        Hey, how are you doing?
      </Message>
      <Message position="sent" author="You" timestamp="2:31 PM">
        I'm doing great, thanks!
      </Message>
    </div>
  );
}`,
});
