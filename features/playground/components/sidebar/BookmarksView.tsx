"use client";

import { usePlayground } from "../../context";
import { Icon } from "../../ui/icons";

export function BookmarksView() {
  const { files, setStatusMessage } = usePlayground();

  return (
    <div className="px-2 py-1">
      {files.bookmarks.length === 0 && (
        <p className="px-1 py-4 text-center text-[12px] text-[#6a6a72]">
          No bookmarks yet
        </p>
      )}
      <ul className="flex flex-col gap-1">
        {files.bookmarks.map((bookmark) => (
          <li
            key={bookmark.id}
            className="group flex items-center gap-1.5 rounded border border-[#2a2a2e] bg-[#1f1f23] px-2 py-1.5"
          >
            <Icon name="bookmark" width={12} height={12} className="text-[#e5c07b]" />
            <button
              type="button"
              onClick={() => {
                files.openFile(bookmark.file);
                setStatusMessage(`Jumped to ${bookmark.file}:${bookmark.line}`);
              }}
              className="min-w-0 flex-1 text-left"
            >
              <span className="block truncate text-[12px] text-[#d4d4d8]">
                {bookmark.file}:<span className="text-[#9ca3af]">{bookmark.line}</span>
              </span>
              <span className="block text-[10px] text-[#6a6a72]">{bookmark.label}</span>
            </button>
            <button
              type="button"
              onClick={() => files.removeBookmark(bookmark.id)}
              title="Remove bookmark"
              className="hidden h-5 w-5 items-center justify-center rounded text-[#6a6a72] hover:bg-[#37373d] hover:text-[#f48771] group-hover:flex"
            >
              <Icon name="x" width={11} height={11} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
