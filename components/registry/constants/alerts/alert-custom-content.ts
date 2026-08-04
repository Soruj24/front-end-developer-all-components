import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const alertCustomContent: RegistryEntry = entry({
  id: "alert-custom-content",
  title: "Custom Content",
  description: "Alerts with rich, multi-line content.",
  source: `import { Alert } from "@/components/_alert";

function InfoIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

export default function AlertCustomContent() {
  return (
    <div className="flex flex-col gap-3">
      <Alert variant="info" icon={<InfoIcon />}>
        <div className="flex flex-col gap-1">
          <span className="font-semibold">System Maintenance</span>
          <span className="text-sm opacity-90">
            Scheduled maintenance window: Saturday 2:00 AM — 4:00 AM UTC.
            Some services may be temporarily unavailable.
          </span>
        </div>
      </Alert>

      <Alert variant="warning" icon={<WarningIcon />}>
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Storage quota almost reached</span>
          <span className="text-sm opacity-90">
            You&apos;ve used 95% of your allocated storage.
            Consider archiving old files or upgrading your plan.
          </span>
        </div>
      </Alert>
    </div>
  );
}`,
});
