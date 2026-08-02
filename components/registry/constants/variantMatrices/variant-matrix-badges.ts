import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { matrixImport } from "./shared";

export const variantMatrixBadges: RegistryEntry = entry({
    id: "variant-matrix-badges",
    title: "Badges",
    description:
      "Six badge colors × four styles at high density — tag filters slice the matrix by color or style, and the grid degrades to stacked cards on mobile.",
    source: `${matrixImport}import { Badge } from "@/components/ui";

const rows = [
  { id: "default", label: "Default", sublabel: "Neutral" },
  { id: "primary", label: "Primary", sublabel: "Brand" },
  { id: "secondary", label: "Secondary", sublabel: "Soft" },
  { id: "success", label: "Success", sublabel: "Positive" },
  { id: "warning", label: "Warning", sublabel: "Caution" },
  { id: "error", label: "Error", sublabel: "Danger" },
];

const columns = [
  { id: "solid", label: "Solid", sublabel: "Filled" },
  { id: "soft", label: "Soft", sublabel: "Tinted" },
  { id: "outline", label: "Outline", sublabel: "Bordered" },
  { id: "dot", label: "Dot", sublabel: "Status" },
];

const solids = {
  default: "bg-secondary text-secondary-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  error: "bg-danger text-danger-foreground",
};

const softs = {
  default: "bg-muted text-foreground border border-border/60",
  primary: "bg-primary-soft text-primary border border-primary/25",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success-soft text-success border border-success/25",
  warning: "bg-warning-soft text-warning border border-warning/25",
  error: "bg-danger-soft text-danger border border-danger/25",
};

const colorTags = {
  default: ["neutral"],
  primary: ["brand"],
  secondary: ["brand"],
  success: ["status"],
  warning: ["status"],
  error: ["status"],
};

const cells = rows.flatMap((row) =>
  columns.map((col) => {
    const label = row.label + " · " + col.label;
    const cls =
      col.id === "solid" ? solids[row.id] : col.id === "soft" ? softs[row.id] : "border border-border text-foreground";
    const dot = col.id === "dot";
    const preview = dot ? (
      <Badge className={softs[row.id]} dot>{row.label}</Badge>
    ) : (
      <Badge className={cls}>{row.label}</Badge>
    );
    const config = dot
      ? '<Badge className="' + softs[row.id] + '" dot>' + row.label + '</Badge>'
      : '<Badge className="' + cls + '">' + row.label + '</Badge>';
    const styleTag =
      col.id === "solid" ? "filled" : col.id === "soft" ? "soft" : col.id === "outline" ? "outlined" : "dot";
    return {
      id: row.id + "-" + col.id,
      row: row.id,
      column: col.id,
      label,
      preview,
      config,
      tags: [styleTag].concat(colorTags[row.id]),
    };
  })
);

export default function VariantMatrixBadges() {
  return (
    <VariantMatrix
      title="Badges"
      description="Six colors × four styles."
      rows={rows}
      columns={columns}
      cells={cells}
    />
  );
}`,
  });
