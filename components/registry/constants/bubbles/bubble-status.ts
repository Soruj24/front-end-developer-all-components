import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const bubbleStatus: RegistryEntry = entry({
  id: "bubble-status",
  title: "Status",
  description: "Chat bubbles with timestamps and status indicators.",
  source: `import { Bubble } from "@/components/_bubble";

export default function BubbleStatus() {
  return (
    <div className="flex flex-col gap-3">
      <Bubble variant="default">
        <div className="flex flex-col gap-1">
          <span>Meeting scheduled for tomorrow</span>
          <span className="text-xs opacity-70">9:41 AM</span>
        </div>
      </Bubble>
      <Bubble variant="primary">
        <div className="flex flex-col gap-1">
          <span>Project deadline extended to Friday</span>
          <span className="text-xs opacity-70">10:15 AM</span>
        </div>
      </Bubble>
      <Bubble variant="muted">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          <span>User is online</span>
        </div>
      </Bubble>
    </div>
  );
}`,
});
