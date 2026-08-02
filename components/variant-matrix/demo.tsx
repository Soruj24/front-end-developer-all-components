import {
  Badge,
  Button,
  Input,
  type VariantMatrixAxis,
  type VariantMatrixCell,
} from "@/components/ui";

const svg = (path: string) =>
  function Icon({ className }: { className?: string } = {}) {
    return (
      <svg
        className={className ?? "h-4 w-4"}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    );
  };

const PlusIcon = svg("M12 4.5v15m7.5-7.5h-15");

/* ------------------------------------------------------------------ */
/* Buttons — variants × sizes                                          */
/* ------------------------------------------------------------------ */

type BtnVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type BtnSize = "sm" | "md" | "lg" | "icon";

export const buttonRows: VariantMatrixAxis[] = [
  { id: "primary", label: "Primary", sublabel: "Brand emphasis" },
  { id: "secondary", label: "Secondary", sublabel: "Muted surface" },
  { id: "outline", label: "Outline", sublabel: "Bordered" },
  { id: "ghost", label: "Ghost", sublabel: "Bare" },
  { id: "destructive", label: "Destructive", sublabel: "Danger" },
];

export const buttonColumns: VariantMatrixAxis[] = [
  { id: "sm", label: "Small", sublabel: "h-8" },
  { id: "md", label: "Medium", sublabel: "h-10" },
  { id: "lg", label: "Large", sublabel: "h-12" },
  { id: "icon", label: "Icon", sublabel: "Square" },
];

const buttonMeta: Record<string, { label: string; tags: string[] }> = {
  primary: { label: "Primary", tags: ["filled"] },
  secondary: { label: "Secondary", tags: ["filled"] },
  outline: { label: "Outline", tags: ["bordered"] },
  ghost: { label: "Ghost", tags: ["bare"] },
  destructive: { label: "Destructive", tags: ["filled", "danger"] },
};

export const buttonCells: VariantMatrixCell[] = buttonRows.flatMap((row) =>
  buttonColumns.map((col) => {
    const label = `${buttonMeta[row.id].label} · ${col.label}`;
    const preview =
      col.id === "icon" ? (
        <Button variant={row.id as BtnVariant} size="icon" aria-label={label}>
          <PlusIcon />
        </Button>
      ) : (
        <Button variant={row.id as BtnVariant} size={col.id as BtnSize}>
          {buttonMeta[row.id].label}
        </Button>
      );
    const config =
      col.id === "icon"
        ? `<Button variant="${row.id}" size="icon" aria-label="Settings">\n  <PlusIcon />\n</Button>`
        : `<Button variant="${row.id}" size="${col.id}">${buttonMeta[row.id].label}</Button>`;
    return {
      id: `${row.id}-${col.id}`,
      row: row.id,
      column: col.id,
      label,
      preview,
      config,
      tags: buttonMeta[row.id].tags,
    };
  })
);

/* ------------------------------------------------------------------ */
/* Inputs — states × field types                                       */
/* ------------------------------------------------------------------ */

type InputType = "text" | "email" | "password" | "search";

export const inputRows: VariantMatrixAxis[] = [
  { id: "default", label: "Default", sublabel: "Editable" },
  { id: "filled", label: "Prefilled", sublabel: "Has value" },
  { id: "disabled", label: "Disabled", sublabel: "Locked" },
  { id: "error", label: "Error", sublabel: "Invalid" },
];

export const inputColumns: VariantMatrixAxis[] = [
  { id: "text", label: "Text", sublabel: "Short text" },
  { id: "email", label: "Email", sublabel: "Address" },
  { id: "password", label: "Password", sublabel: "Secret" },
  { id: "search", label: "Search", sublabel: "Query" },
];

export const inputCells: VariantMatrixCell[] = inputRows.flatMap((row) =>
  inputColumns.map((col) => {
    const type =
      col.id === "email" || col.id === "password" || col.id === "search"
        ? (col.id as InputType)
        : "text";
    const label = `${row.label} · ${col.label}`;
    let preview: React.ReactNode;
    let config: string;
    if (row.id === "filled") {
      preview = <Input type={type} defaultValue="user@example.com" className="w-full" />;
      config = `<Input type="${type}" defaultValue="user@example.com" className="w-full" />`;
    } else if (row.id === "disabled") {
      preview = <Input type={type} placeholder="Disabled" disabled className="w-full" />;
      config = `<Input type="${type}" placeholder="Disabled" disabled className="w-full" />`;
    } else if (row.id === "error") {
      preview = <Input type={type} placeholder="Value" error="Required field" className="w-full" />;
      config = `<Input type="${type}" placeholder="Value" error="Required field" className="w-full" />`;
    } else {
      preview = <Input type={type} placeholder="Enter value" className="w-full" />;
      config = `<Input type="${type}" placeholder="Enter value" className="w-full" />`;
    }
    const tags =
      row.id === "disabled"
        ? ["locked"]
        : row.id === "error"
          ? ["validation"]
          : ["interactive"];
    return {
      id: `${row.id}-${col.id}`,
      row: row.id,
      column: col.id,
      label,
      preview,
      config,
      tags,
    };
  })
);

/* ------------------------------------------------------------------ */
/* Badges — colors × styles                                            */
/* ------------------------------------------------------------------ */

export const badgeRows: VariantMatrixAxis[] = [
  { id: "default", label: "Default", sublabel: "Neutral" },
  { id: "primary", label: "Primary", sublabel: "Brand" },
  { id: "secondary", label: "Secondary", sublabel: "Soft" },
  { id: "success", label: "Success", sublabel: "Positive" },
  { id: "warning", label: "Warning", sublabel: "Caution" },
  { id: "error", label: "Error", sublabel: "Danger" },
];

export const badgeColumns: VariantMatrixAxis[] = [
  { id: "solid", label: "Solid", sublabel: "Filled" },
  { id: "soft", label: "Soft", sublabel: "Tinted" },
  { id: "outline", label: "Outline", sublabel: "Bordered" },
  { id: "dot", label: "Dot", sublabel: "Status" },
];

const badgeSolids: Record<string, string> = {
  default: "bg-secondary text-secondary-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  error: "bg-danger text-danger-foreground",
};

const badgeSofts: Record<string, string> = {
  default: "bg-muted text-foreground border border-border/60",
  primary: "bg-primary-soft text-primary border border-primary/25",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success-soft text-success border border-success/25",
  warning: "bg-warning-soft text-warning border border-warning/25",
  error: "bg-danger-soft text-danger border border-danger/25",
};

const badgeColorTags: Record<string, string[]> = {
  default: ["neutral"],
  primary: ["brand"],
  secondary: ["brand"],
  success: ["status"],
  warning: ["status"],
  error: ["status"],
};

export const badgeCells: VariantMatrixCell[] = badgeRows.flatMap((row) =>
  badgeColumns.map((col) => {
    const label = `${row.label} · ${col.label}`;
    const cls =
      col.id === "solid"
        ? badgeSolids[row.id]
        : col.id === "soft"
          ? badgeSofts[row.id]
          : "border border-border text-foreground";
    const dot = col.id === "dot";
    const preview = dot ? (
      <Badge className={badgeSofts[row.id]} dot>
        {row.label}
      </Badge>
    ) : (
      <Badge className={cls}>{row.label}</Badge>
    );
    const config = dot
      ? `<Badge className="${badgeSofts[row.id]}" dot>${row.label}</Badge>`
      : `<Badge className="${cls}">${row.label}</Badge>`;
    const styleTag =
      col.id === "solid" ? "filled" : col.id === "soft" ? "soft" : col.id === "outline" ? "outlined" : "dot";
    return {
      id: `${row.id}-${col.id}`,
      row: row.id,
      column: col.id,
      label,
      preview,
      config,
      tags: [styleTag, ...badgeColorTags[row.id]],
    };
  })
);
