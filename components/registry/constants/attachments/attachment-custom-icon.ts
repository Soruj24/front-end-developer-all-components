import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const attachmentCustomIcon: RegistryEntry = entry({
  id: "attachment-custom-icon",
  title: "Custom Icon",
  description: "Attachments with custom colored icons.",
  source: `import { Attachment } from "@/components/_attachment";

export default function AttachmentCustomIcon() {
  return (
    <div className="flex flex-col gap-2">
      <Attachment
        filename="presentation.pptx"
        size="15.3 MB"
        icon={
          <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        }
      />
      <Attachment
        filename="database.sql"
        size="340 KB"
        icon={
          <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        }
      />
      <Attachment
        filename="video-demo.mp4"
        size="256 MB"
        icon={
          <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        }
      />
    </div>
  );
}`,
});
