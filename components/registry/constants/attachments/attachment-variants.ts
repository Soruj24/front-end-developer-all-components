import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const attachmentVariants: RegistryEntry = entry({
  id: "attachment-variants",
  title: "Variants",
  description: "Three visual styles — default, outline, and ghost.",
  source: `import { Attachment } from "@/components/_attachment";

function PdfIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

const variants = ["default", "outline", "ghost"] as const;

export default function AttachmentVariants() {
  return (
    <div className="flex flex-col gap-3">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground capitalize">{variant}</p>
          <Attachment filename="report.pdf" size="1.2 MB" variant={variant} icon={<PdfIcon />} />
        </div>
      ))}
    </div>
  );
}`,
});
