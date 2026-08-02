"use client";

import { usePlayground } from "../../context";
import { TEMPLATES } from "../../constants/templates";
import { Icon } from "../../ui/icons";

export function TemplatesView() {
  const { files, setStatusMessage } = usePlayground();

  const load = (index: number) => {
    const template = TEMPLATES[index];
    files.loadProject(template.files);
    setStatusMessage(`Template loaded: ${template.label}`);
  };

  return (
    <div className="px-2 py-1">
      <p className="px-1 pb-2 text-[11px] leading-relaxed text-[#9ca3af]">
        Start from a scaffold, then remix it in the editor.
      </p>
      <ul className="flex flex-col gap-1.5">
        {TEMPLATES.map((template, i) => (
          <li key={template.id}>
            <button
              type="button"
              onClick={() => load(i)}
              className="group w-full rounded-md border border-[#2a2a2e] bg-[#1f1f23] px-3 py-2 text-left transition-colors hover:border-[#2b7de9]"
            >
              <span className="flex items-center gap-2">
                <Icon name="layout" width={13} height={13} className="text-[#2b7de9]" />
                <span className="text-[13px] font-medium text-[#d4d4d8]">{template.label}</span>
                <span className="ml-auto text-[10px] text-[#6a6a72] opacity-0 transition-opacity group-hover:opacity-100">
                  Insert
                </span>
              </span>
              <span className="mt-0.5 block text-[11px] text-[#9ca3af]">{template.description}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
