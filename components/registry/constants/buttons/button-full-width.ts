import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonFullWidth: RegistryEntry = entry({
    id: "button-full-width",
    title: "Full Width",
    description: "Block-level buttons that stretch to fill their container.",
    source: `import { Button } from "@/components/ui";

export default function ButtonFullWidth() {
  return (
    <div className="flex flex-col gap-3">
      <Button className="w-full">Full Width Button</Button>
      <Button variant="outline" className="w-full">Outline Full Width</Button>
      <Button variant="secondary" className="w-full">Secondary Full Width</Button>
    </div>
  );
}`,
  });
