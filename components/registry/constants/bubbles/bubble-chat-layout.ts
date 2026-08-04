import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const bubbleChatLayout: RegistryEntry = entry({
  id: "bubble-chat-layout",
  title: "Chat Layout",
  description: "Full chat layout with avatars and message alignment.",
  source: `import { Bubble } from "@/components/_bubble";

function UserIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export default function BubbleChatLayout() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
          <UserIcon />
        </div>
        <Bubble variant="default" tail>
          Hey, did you see the new design mockups?
        </Bubble>
      </div>

      <div className="flex items-start gap-3 flex-row-reverse">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <BotIcon />
        </div>
        <Bubble variant="primary" tail>
          Yes! They look amazing. The new color scheme is perfect.
        </Bubble>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
          <UserIcon />
        </div>
        <Bubble variant="default" tail>
          Should we schedule a review meeting?
        </Bubble>
      </div>

      <div className="flex items-start gap-3 flex-row-reverse">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <BotIcon />
        </div>
        <Bubble variant="primary" tail>
          Sure! How about tomorrow at 2 PM?
        </Bubble>
      </div>
    </div>
  );
}`,
});
