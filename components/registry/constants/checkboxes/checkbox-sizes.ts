import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const checkboxSizes: RegistryEntry = entry({
  id: "checkbox-sizes",
  title: "Sizes",
  description: "Three size options — small, medium, and large.",
  source: `import { Checkbox } from "@/components/_checkbox";

const sizes = ["sm", "md", "lg"] as const;

export default function CheckboxSizes() {
  return (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-4">
          <Checkbox size={size} label={\`\${size} checkbox\`} />
          <Checkbox size={size} label={\`\${size} checked\`} defaultChecked />
          <Checkbox size={size} label={\`\${size} disabled\`} disabled />
        </div>
      ))}
    </div>
  );
}`,
});
