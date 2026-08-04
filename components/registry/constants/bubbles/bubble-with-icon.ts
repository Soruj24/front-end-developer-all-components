import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const bubbleWithIcon: RegistryEntry = entry({
  id: "bubble-with-icon",
  title: "With Icon",
  description: "Chat bubbles with leading icons.",
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

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function BubbleWithIcon() {
  return (
    <div className="flex flex-col gap-3">
      <Bubble variant="default" icon={<UserIcon />}>
        Can you help me with this task?
      </Bubble>
      <Bubble variant="primary" icon={<BotIcon />}>
        Of course! Let me take a look.
      </Bubble>
      <Bubble variant="secondary" icon={<CheckIcon />}>
        Task completed successfully.
      </Bubble>
    </div>
  );
}`,
});
