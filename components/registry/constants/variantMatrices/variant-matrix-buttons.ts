import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { matrixImport } from "./shared";

export const variantMatrixButtons: RegistryEntry = entry({
    id: "variant-matrix-buttons",
    title: "Buttons",
    description:
      "Five button variants × four sizes with live previews — search, tag filters, per-cell copy config, and a responsive table-to-cards layout.",
    source: `${matrixImport}import { Button } from "@/components/ui";

const rows = [
  { id: "primary", label: "Primary", sublabel: "Brand emphasis" },
  { id: "secondary", label: "Secondary", sublabel: "Muted surface" },
  { id: "outline", label: "Outline", sublabel: "Bordered" },
  { id: "ghost", label: "Ghost", sublabel: "Bare" },
  { id: "destructive", label: "Destructive", sublabel: "Danger" },
];

const columns = [
  { id: "sm", label: "Small", sublabel: "h-8" },
  { id: "md", label: "Medium", sublabel: "h-10" },
  { id: "lg", label: "Large", sublabel: "h-12" },
  { id: "icon", label: "Icon", sublabel: "Square" },
];

const svg = (path) => (props) => (
  <svg className={props?.className ?? "h-4 w-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const PlusIcon = svg("M12 4.5v15m7.5-7.5h-15");

const meta = {
  primary: { label: "Primary", tags: ["filled"] },
  secondary: { label: "Secondary", tags: ["filled"] },
  outline: { label: "Outline", tags: ["bordered"] },
  ghost: { label: "Ghost", tags: ["bare"] },
  destructive: { label: "Destructive", tags: ["filled", "danger"] },
};

const cells = rows.flatMap((row) =>
  columns.map((col) => {
    const label = meta[row.id].label + " · " + col.label;
    const preview =
      col.id === "icon" ? (
        <Button variant={row.id} size="icon" aria-label={label}>
          <PlusIcon />
        </Button>
      ) : (
        <Button variant={row.id} size={col.id}>{meta[row.id].label}</Button>
      );
    const config =
      col.id === "icon"
        ? '<Button variant="' + row.id + '" size="icon" aria-label="Settings">\\n  <PlusIcon />\\n</Button>'
        : '<Button variant="' + row.id + '" size="' + col.id + '">' + meta[row.id].label + '</Button>';
    return {
      id: row.id + "-" + col.id,
      row: row.id,
      column: col.id,
      label,
      preview,
      config,
      tags: meta[row.id].tags,
    };
  })
);

export default function VariantMatrixButtons() {
  return (
    <VariantMatrix
      title="Buttons"
      description="Every variant × size combination, rendered live."
      rows={rows}
      columns={columns}
      cells={cells}
    />
  );
}`,
  });
