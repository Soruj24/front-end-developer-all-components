import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const messageAvatar: RegistryEntry = entry({
  id: "message-avatar",
  title: "With Avatar",
  description: "Message with avatar.",
  source: `import { Message } from "@/components/_message";

function UserAvatar({ name }: { name: string }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium dark:bg-zinc-700">
      {name[0]}
    </div>
  );
}

export default function MessageAvatar() {
  return (
    <div className="flex flex-col gap-3">
      <Message
        position="received"
        author="Alice"
        avatar={<UserAvatar name="A" />}
      >
        Hey there!
      </Message>
      <Message
        position="sent"
        author="You"
        avatar={<UserAvatar name="Y" />}
      >
        Hi Alice!
      </Message>
    </div>
  );
}`,
});
