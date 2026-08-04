import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonGroupGap: RegistryEntry = entry({
  id: "button-group-gap",
  title: "Gap",
  description: "Different gap sizes between buttons.",
  source: `import { ButtonGroup } from "@/components/_button-group";

const gaps = ["none", "xs", "sm", "md"] as const;

export default function ButtonGroupGap() {
  return (
    <div className="flex flex-col gap-4">
      {gaps.map((gap) => (
        <div key={gap} className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground capitalize">Gap: {gap}</p>
          <ButtonGroup gap={gap}>
            <button type="button" className="px-4 py-2 text-sm font-medium">A</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">B</button>
            <button type="button" className="px-4 py-2 text-sm font-medium">C</button>
          </ButtonGroup>
        </div>
      ))}
    </div>
  );
}`,
});
