"use client";

export function ChatPreview() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-zinc-900 px-4 py-2.5 text-sm text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900">
          Hello, how are you?
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100">
          I&apos;m doing great, thanks!
        </div>
      </div>
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-zinc-900 px-4 py-2.5 text-sm text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900">
          What about you?
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100">
          Same here! Let&apos;s catch up soon.
        </div>
      </div>
    </div>
  );
}
