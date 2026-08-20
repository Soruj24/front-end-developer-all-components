"use client";

import { useState } from "react";
import { Button } from "../../Button";

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export function LoadingStateExample() {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 2000);
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 2500);
  };

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => setDeleting(false), 1500);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={handleSave} disabled={saving}>
        {saving && <Spinner />}
        {saving ? "Saving..." : "Save Changes"}
      </Button>
      <Button variant="outline" onClick={handleUpload} disabled={uploading}>
        {uploading && <Spinner />}
        {uploading ? "Uploading..." : "Upload File"}
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
        {deleting && <Spinner />}
        {deleting ? "Deleting..." : "Delete"}
      </Button>
      <Button variant="secondary" disabled>
        <Spinner />
        Processing...
      </Button>
    </div>
  );
}
