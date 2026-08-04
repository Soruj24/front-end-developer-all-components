import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertDismissible: RegistryEntry = entry({
  id: "alert-dismissible",
  title: "Dismissible",
  description: "Alerts with a close button for dismissal.",
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

function CloseIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function AlertDismissible() {
  return (
    <div className="flex flex-col gap-3">
      <Alert
        variant="info"
        icon={<InfoIcon />}
        action={
          <button type="button" className="rounded-sm opacity-70 hover:opacity-100">
            <CloseIcon />
          </button>
        }
      >
        A new software update is available. See what&apos;s new in version 3.0.
      </Alert>

      <Alert
        variant="success"
        icon={<CheckIcon />}
        action={
          <button type="button" className="rounded-sm opacity-70 hover:opacity-100">
            <CloseIcon />
          </button>
        }
      >
        Your changes have been saved successfully.
      </Alert>
    </div>
  );
}`,
});
