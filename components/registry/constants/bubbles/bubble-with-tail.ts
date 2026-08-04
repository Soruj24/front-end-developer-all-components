import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const bubbleWithTail: RegistryEntry = entry({
  id: "bubble-with-tail",
  title: "With Tail",
  description: "Chat bubbles with tail for message threading.",
  source: `import { Bubble } from "@/components/_bubble";

export default function BubbleWithTail() {
  return (
    <div className="flex flex-col gap-3">
      <Bubble variant="default" tail>
        Hello! What time is the meeting?
      </Bubble>
      <Bubble variant="primary" tail>
        It&apos;s at 3 PM in the conference room.
      </Bubble>
      <Bubble variant="default" tail>
        Got it, thanks!
      </Bubble>
    </div>
  );
}`,
});
