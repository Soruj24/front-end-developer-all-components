"use client";

import { useState } from "react";
import { usePlayground } from "../../context";
import { Icon } from "../../ui/icons";

const ASSETS = [
  { name: "esbuild.wasm", path: "/esbuild.wasm", kind: "wasm", size: "~11 MB" },
  { name: "favicon.ico", path: "/favicon.ico", kind: "image", size: "~4 KB" },
  { name: "og-image.png", path: "/og.png", kind: "image", size: "~180 KB" },
  { name: "app-icon.png", path: "/icon.png", kind: "image", size: "~8 KB" },
];

export function AssetsView() {
  const { setStatusMessage } = usePlayground();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (path: string) => {
    try {
      await navigator.clipboard?.writeText(path);
      setCopied(path);
      setStatusMessage(`Copied ${path}`);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      setStatusMessage(`Path: ${path}`);
    }
  };

  return (
    <div className="px-2 py-1">
      <p className="px-1 pb-2 text-[11px] leading-relaxed text-[#9ca3af]">
        Public assets bundled with the playground. Click to copy the public path.
      </p>
      <ul className="flex flex-col gap-1">
        {ASSETS.map((asset) => (
          <li key={asset.name}>
            <button
              type="button"
              onClick={() => void copy(asset.path)}
              className="flex w-full items-center gap-2 rounded border border-[#2a2a2e] bg-[#1f1f23] px-2 py-2 text-left transition-colors hover:border-[#3a3a41]"
            >
              <Icon name={asset.kind === "wasm" ? "box" : "image"} width={14} height={14} className="text-[#9ca3af]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-mono text-[12px] text-[#d4d4d8]">{asset.name}</span>
                <span className="block text-[11px] text-[#6a6a72]">{asset.size}</span>
              </span>
              {copied === asset.path ? (
                <Icon name="check" width={13} height={13} className="text-[#89d185]" />
              ) : (
                <Icon name="copy" width={13} height={13} className="text-[#6a6a72]" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
