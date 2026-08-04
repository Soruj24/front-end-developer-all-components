import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const bubbleDefault: RegistryEntry = entry({
  id: "bubble-default",
  title: "Default",
  description: "Basic chat bubble conversation.",
  source: `import { Bubble } from "@/components/_bubble";

export default function BubbleDefault() {
  return (
    <div className="flex flex-col gap-3">
      <Bubble variant="default">
        Hey, how&apos;s the project going?
      </Bubble>
      <Bubble variant="primary">
        It&apos;s going well! Just finished the new components.
      </Bubble>
      <Bubble variant="default">
        Nice! Can you show me a demo?
      </Bubble>
    </div>
  );
}`,
});
