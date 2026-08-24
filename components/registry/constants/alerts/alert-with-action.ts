import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertWithAction: RegistryEntry = entry({
  id: "alert-with-action",
  title: "With Action",
  description: "Alerts with action buttons for user interaction.",
  source: `import { Alert } from "@/components/ui/Alert";

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

export default function AlertWithAction() {
  return (
    <div className="flex flex-col gap-3">
      <Alert
        variant="warning"
        icon={<WarningIcon />}
        action={
          <button type="button" className="text-sm font-medium underline hover:no-underline">
            Learn more
          </button>
        }
      >
        Your trial expires in 3 days. Upgrade now to keep full access.
      </Alert>

      <Alert
        variant="error"
        icon={<ErrorIcon />}
        action={
          <button type="button" className="rounded bg-danger px-3 py-1 text-xs font-medium text-danger-foreground hover:bg-danger/90">
            Dismiss
          </button>
        }
      >
        Payment failed. Please update your billing information.
      </Alert>
    </div>
  );
}`,
});
