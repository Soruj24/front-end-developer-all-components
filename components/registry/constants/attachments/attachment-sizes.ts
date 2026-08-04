import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const attachmentSizes: RegistryEntry = entry({
  id: "attachment-sizes",
  title: "Sizes",
  description: "Three size options — small, medium, and large.",
  source: `import { Attachment } from "@/components/_attachment";

function FileIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

const sizes = ["sm", "md", "lg"] as const;

export default function AttachmentSizes() {
  return (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground capitalize">{size}</p>
          <Attachment filename="design.fig" size="8.5 MB" sizeProp={size} icon={<FileIcon />} />
        </div>
      ))}
    </div>
  );
}`,
});
