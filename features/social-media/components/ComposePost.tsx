"use client";

import { useState } from "react";
import Image from "next/image";
import { currentUser } from "../constants/social-data";
import { Avatar } from "./Avatar";

export function ComposePost() {
  const [text, setText] = useState("");

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex gap-3">
        <Avatar user={currentUser} />
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            rows={2}
            className="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[
                { label: "Photo", color: "hover:text-blue-500", path: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
                { label: "Video", color: "hover:text-green-500", path: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                { label: "Poll", color: "hover:text-yellow-500", path: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" },
                { label: "Emoji", color: "hover:text-purple-500", path: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              ].map((btn) => (
                <button key={btn.label} className={`rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${btn.color}`}>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={btn.path} />
                  </svg>
                </button>
              ))}
            </div>
            <button disabled={!text.trim()} className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
