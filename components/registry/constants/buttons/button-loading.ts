import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonLoading: RegistryEntry = entry({
    id: "button-loading",
    title: "Loading",
    description: "Inline spinners that keep the layout stable while working.",
    source: `import { useState } from "react";
import { Button } from "@/components/ui";

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function ButtonLoading() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={() => setLoading(true)} disabled={loading}>
        {loading && <Spinner />}
        {loading ? "Saving..." : "Save"}
      </Button>
      <Button variant="outline" onClick={() => setLoading2(true)} disabled={loading2}>
        {loading2 && <Spinner />}
        {loading2 ? "Uploading..." : "Upload"}
      </Button>
      <Button variant="destructive" disabled>
        <Spinner />
        Deleting...
      </Button>
      <Button variant="secondary" disabled>
        <Spinner />
        Processing
      </Button>
      <Button variant="ghost" onClick={() => { setLoading(false); setLoading2(false); }}>
        Reset Loading
      </Button>
    </div>
  );
}`,
  });
