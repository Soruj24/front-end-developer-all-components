import type { ReactNode } from "react";
import { Alert, Button, Countdown, EmptyState, Toast } from "@/components/ui";

/** Feedback and status demos — mostly static, no hooks. */
export const feedback: Record<string, () => ReactNode> = {
  alert: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert variant="info" icon>
        A new version of the registry is available.
      </Alert>
      <Alert variant="success" icon dismissible>
        Your component was published successfully.
      </Alert>
      <Alert variant="warning" icon>
        Your download quota is at 87%.
      </Alert>
      <Alert variant="error" icon>
        The deployment failed after the timeout.
      </Alert>
    </div>
  ),

  toast: () => (
    <div className="w-full max-w-sm">
      <Toast
        position="top-center"
        toasts={[
          { id: "1", type: "success", message: "Changes saved", action: { label: "Undo", onClick: () => {} } },
          { id: "2", type: "info", message: "Build started" },
          { id: "3", type: "warning", message: "Quota almost reached" },
        ]}
        onDismiss={() => {}}
      />
    </div>
  ),

  "empty-state": () => (
    <EmptyState
      size="md"
      title="No projects yet"
      description="Create your first project to start collecting components."
      action={<Button size="sm">New project</Button>}
    />
  ),

  countdown: () => (
    <Countdown
      targetDate={new Date(Date.now() + 1000 * 60 * 60 * 26)}
      showLabels
      size="lg"
    />
  ),
};
