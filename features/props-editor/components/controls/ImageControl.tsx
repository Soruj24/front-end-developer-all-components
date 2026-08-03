"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ImageField } from "../../types";
import { INPUT_CLASS } from "./styles";
import type { ControlProps } from "./types";

function readAsDataUrl(file: File, callback: (url: string) => void) {
  const reader = new FileReader();
  reader.onload = () => callback(String(reader.result ?? ""));
  reader.readAsDataURL(file);
}

/** Image source: file upload (data URL) or direct URL. */
export function ImageControl({ field, value, onChange, onBegin, onEnd }: ControlProps) {
  const f = field as ImageField;
  const inputRef = useRef<HTMLInputElement>(null);
  const current = String(value);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onFocus={onBegin}
          onBlur={onEnd}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) readAsDataUrl(file, onChange);
          }}
        />
        <input
          type="text"
          className={INPUT_CLASS}
          value={current}
          placeholder={f.placeholder ?? "Paste an image URL…"}
          spellCheck={false}
          onFocus={onBegin}
          onBlur={onEnd}
          onChange={(event) => onChange(event.target.value)}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="h-8 shrink-0 rounded-md border border-input bg-muted px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Upload
        </button>
      </div>
      {current && (
        <div className="h-20 w-32 overflow-hidden rounded-md border border-input bg-muted/40">
          <Image
            src={current}
            alt="Preview"
            width={128}
            height={80}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
