import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertSizes: RegistryEntry = entry({
  id: "alert-sizes",
  title: "Sizes",
  description: "Three size options — small, medium, and large.",
  source: `import { Alert } from "@/components/ui/Alert";

function InfoIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const sizes = ["sm", "md", "lg"] as const;

export default function AlertSizes() {
  return (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <Alert key={size} variant="info" size={size} icon>
          <span className="font-medium capitalize">{size}</span> size alert with icon.
        </Alert>
      ))}
    </div>
  );
}`,
});
