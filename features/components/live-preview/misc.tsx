"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { FileUpload, SearchInput } from "@/components/ui";

/** Misc input demos that need client state. */
export const misc: Record<string, () => ReactNode> = {
  "search-input": () => <SearchInputDemo />,

  "file-upload": () => (
    <div className="w-full max-w-sm">
      <FileUpload maxFiles={3} accept="image/*" />
    </div>
  ),
};

function SearchInputDemo() {
  const [value, setValue] = useState("");
  return (
    <SearchInput
      value={value}
      onChange={setValue}
      onClear={() => setValue("")}
      placeholder="Search components…"
      shortcut="⌘K"
      recentSearches={["button", "tabs", "modal"]}
      onRecentClick={(search) => setValue(search)}
      className="w-full max-w-sm"
    />
  );
}
