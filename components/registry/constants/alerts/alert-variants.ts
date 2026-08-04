import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertVariants: RegistryEntry = entry({
  id: "alert-variants",
  title: "Variants",
  description:
    "Five visual styles — default, destructive, success, warning, and info.",
  source: `import { Alert } from "@/components/_alert";

function InfoIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const iconMap = {
  default: <InfoIcon />,
  info: <InfoIcon />,
  success: <CheckIcon />,
  warning: <WarningIcon />,
  destructive: <ErrorIcon />,
};

const variants = ["default", "destructive", "success", "warning", "info"] as const;

export default function AlertVariants() {
  return (
    <div className="flex flex-col gap-3">
      {variants.map((variant) => (
        <Alert key={variant} variant={variant} icon={iconMap[variant]}>
          <span className="font-medium capitalize">{variant}</span> alert — This is a sample alert message.
        </Alert>
      ))}
    </div>
  );
}`,
});
