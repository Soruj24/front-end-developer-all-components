import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { matrixImport } from "./shared";

export const variantMatrixInputs: RegistryEntry = entry({
    id: "variant-matrix-inputs",
    title: "Form Fields",
    description:
      "Four input states × four field types — filter by interaction or validation state and copy the exact JSX from any cell.",
    source: `${matrixImport}import { Input } from "@/components/ui";

const rows = [
  { id: "default", label: "Default", sublabel: "Editable" },
  { id: "filled", label: "Prefilled", sublabel: "Has value" },
  { id: "disabled", label: "Disabled", sublabel: "Locked" },
  { id: "error", label: "Error", sublabel: "Invalid" },
];

const columns = [
  { id: "text", label: "Text", sublabel: "Short text" },
  { id: "email", label: "Email", sublabel: "Address" },
  { id: "password", label: "Password", sublabel: "Secret" },
  { id: "search", label: "Search", sublabel: "Query" },
];

const cells = rows.flatMap((row) =>
  columns.map((col) => {
    const type = col.id === "email" || col.id === "password" || col.id === "search" ? col.id : "text";
    const label = row.label + " · " + col.label;
    let preview;
    let config;
    if (row.id === "filled") {
      preview = <Input type={type} defaultValue="user@example.com" className="w-full" />;
      config = '<Input type="' + type + '" defaultValue="user@example.com" className="w-full" />';
    } else if (row.id === "disabled") {
      preview = <Input type={type} placeholder="Disabled" disabled className="w-full" />;
      config = '<Input type="' + type + '" placeholder="Disabled" disabled className="w-full" />';
    } else if (row.id === "error") {
      preview = <Input type={type} placeholder="Value" error="Required field" className="w-full" />;
      config = '<Input type="' + type + '" placeholder="Value" error="Required field" className="w-full" />';
    } else {
      preview = <Input type={type} placeholder="Enter value" className="w-full" />;
      config = '<Input type="' + type + '" placeholder="Enter value" className="w-full" />';
    }
    const tags =
      row.id === "disabled" ? ["locked"] : row.id === "error" ? ["validation"] : ["interactive"];
    return {
      id: row.id + "-" + col.id,
      row: row.id,
      column: col.id,
      label,
      preview,
      config,
      tags,
    };
  })
);

export default function VariantMatrixInputs() {
  return (
    <VariantMatrix
      title="Form Fields"
      description="States × field types with validation and lock toggles."
      rows={rows}
      columns={columns}
      cells={cells}
    />
  );
}`,
  });
