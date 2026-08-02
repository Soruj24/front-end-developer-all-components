"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getRegistryItem, registryIds } from "@/components/registry";
import { usePlayground } from "../../context";
import { registryItemToFiles } from "../../registry";
import { Icon } from "../../ui/icons";

export function RegistryView() {
  const { files, setStatusMessage } = usePlayground();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = registryIds.filter((id) => {
      if (!q) return true;
      const item = getRegistryItem(id);
      return id.includes(q) || (item?.title ?? "").toLowerCase().includes(q);
    });
    const map = new Map<string, string[]>();
    for (const id of filtered) {
      const dash = id.indexOf("-");
      const key = dash > 0 ? id.slice(0, dash) : id;
      map.set(key, [...(map.get(key) ?? []), id]);
    }
    return [...map.entries()];
  }, [query]);

  const load = (id: string) => {
    const project = registryItemToFiles(id);
    if (project.length === 0) return;
    files.loadProject(project);
    router.replace(`/playground?component=${encodeURIComponent(id)}`, { scroll: false });
    setStatusMessage(`Loaded ${id}`);
  };

  return (
    <div className="px-2 py-1">
      <div className="mb-2 flex items-center gap-2 rounded border border-[#3a3a41] bg-[#1f1f23] px-2 py-1.5">
        <Icon name="grid" width={13} height={13} className="text-[#9ca3af]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search registry…"
          className="w-full bg-transparent text-[13px] text-[#d4d4d8] outline-none placeholder:text-[#6a6a72]"
        />
      </div>

      <div className="flex flex-wrap gap-1 px-1 pb-1">
        {["button", "card", "input", "form", "table", "pagination", "nav"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setQuery(cat)}
            className="rounded-full border border-[#3a3a41] px-2 py-0.5 text-[11px] text-[#9ca3af] hover:border-[#2b7de9] hover:text-[#d4d4d8]"
          >
            {cat}
          </button>
        ))}
      </div>

      {groups.length === 0 && (
        <p className="px-1 py-4 text-center text-[12px] text-[#6a6a72]">No registry matches</p>
      )}

      {groups.map(([category, ids]) => (
        <div key={category} className="mb-1">
          <p className="px-1 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#9ca3af]">
            {category} · {ids.length}
          </p>
          {ids.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => load(id)}
              className="flex w-full items-center gap-1.5 rounded px-1.5 py-0.5 text-left text-[12px] text-[#cccccc] hover:bg-[#2a2a2e]"
            >
              <span className="truncate">{getRegistryItem(id)?.title ?? id}</span>
              <span className="ml-auto truncate font-mono text-[10px] text-[#6a6a72]">{id}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
