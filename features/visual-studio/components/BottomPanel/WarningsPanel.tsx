"use client";

import { useStudio } from "../../context/StudioContext";

interface Warning {
  id: string;
  severity: "error" | "warning" | "info";
  message: string;
  nodeId?: string;
}

function getWarnings(nodes: Record<string, unknown>): Warning[] {
  const warnings: Warning[] = [];
  const nodeRecord = nodes as Record<string, { componentName: string; props: Record<string, unknown>; position: { x: number; y: number } }>;
  for (const [id, node] of Object.entries(nodeRecord)) {
    if (node.componentName === "image" && !node.props.src) {
      warnings.push({ id: `w-${id}-src`, severity: "warning", message: `Image "${node.componentName}" has no source URL`, nodeId: id });
    }
    if (node.componentName === "input" && !node.props.placeholder) {
      warnings.push({ id: `w-${id}-ph`, severity: "info", message: `Input has no placeholder text`, nodeId: id });
    }
    if (node.componentName === "button" && !node.props.text) {
      warnings.push({ id: `w-${id}-txt`, severity: "warning", message: `Button has no text content`, nodeId: id });
    }
    if (node.position.x < 0 || node.position.y < 0) {
      warnings.push({ id: `w-${id}-pos`, severity: "warning", message: `Component "${node.componentName}" is positioned outside the canvas`, nodeId: id });
    }
    if (node.props.borderWidth === 0 && node.props.borderColor) {
      warnings.push({ id: `w-${id}-bc`, severity: "info", message: `Border color set but border width is 0`, nodeId: id });
    }
  }
  const nodeKeys = Object.keys(nodeRecord);
  if (nodeKeys.length === 0) {
    warnings.push({ id: "w-empty", severity: "info", message: "Canvas is empty. Drag components from the left panel." });
  }
  return warnings;
}

export function WarningsPanel() {
  const { canvas } = useStudio();
  const warnings = getWarnings(canvas.nodes);

  return (
    <div className="h-full overflow-auto p-3">
      {warnings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
          <div className="mb-2 text-2xl">✅</div>
          <div className="text-sm">No warnings. All good!</div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {warnings.map((w) => (
            <div key={w.id} className="flex items-start gap-2 rounded border border-border px-3 py-2 text-xs">
              <span className="mt-0.5 shrink-0">
                {w.severity === "error" && <span className="text-danger">●</span>}
                {w.severity === "warning" && <span className="text-warning">●</span>}
                {w.severity === "info" && <span className="text-info">●</span>}
              </span>
              <span className="text-foreground">{w.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
