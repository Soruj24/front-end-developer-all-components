"use client";

import type { ReactNode } from "react";
import { FileUpload } from "@/components/ui";

/** Misc input demos that need client state. */
export const misc: Record<string, () => ReactNode> = {
  "file-upload": () => (
    <div className="w-full max-w-sm">
      <FileUpload maxFiles={3} accept="image/*" />
    </div>
  ),
};
