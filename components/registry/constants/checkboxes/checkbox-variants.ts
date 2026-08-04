import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const checkboxVariants: RegistryEntry = entry({
  id: "checkbox-variants",
  title: "Variants",
  description: "Three visual styles — default, outline, and ghost.",
  source: `import { Checkbox } from "@/components/_checkbox";

const variants = ["default", "outline", "ghost"] as const;

export default function CheckboxVariants() {
  return (
    <div className="flex flex-col gap-3">
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <Checkbox variant={variant} label={variant} />
          <Checkbox variant={variant} label={\`\${variant} checked\`} defaultChecked />
        </div>
      ))}
    </div>
  );
}`,
});
