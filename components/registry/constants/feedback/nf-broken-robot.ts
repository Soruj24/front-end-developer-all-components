import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfBrokenRobot: RegistryEntry = entry({
    id: "nf-broken-robot",
    title: "Terminal 404s",
    description: "A broken robot ASCII error and a fake terminal session.",
    source: `export default function NfBrokenRobot() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 p-6 text-center font-mono dark:border-zinc-800">
        <span className="text-5xl">🤖</span>
        <p className="mt-3 text-lg text-zinc-700 dark:text-zinc-200"><em>beep boop</em> page not found</p>
        <pre className="mt-4 text-[10px] leading-tight text-success dark:text-green-400">
          {[
            "     [ERROR 0x404]",
            "  .----------.",
            " /   SYSTEMS  \\\\",
            "|   FAILURE    |",
            " \\\\   ☠       /",
            "  '----------'",
            "      |  |",
            "     (  )",
          ].join("\\n")}
        </pre>
        <button className="mt-5 rounded bg-success px-5 py-2 font-mono text-sm text-white hover:bg-success/90">reboot.exe</button>
      </div>
      <div className="font-mono" style={{ background: "#0d1117", borderRadius: "12px" }}>
        <div className="flex items-center gap-1.5 border-b border-zinc-700 px-4 py-2.5">
          <div className="h-3 w-3 rounded-full bg-danger" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-success-soft0" />
          <span className="ml-3 text-xs text-zinc-500">terminal — 404</span>
        </div>
        <div className="p-5 text-xs leading-relaxed text-green-400">
          <p><span className="text-cyan-400">user@host</span>:<span className="text-blue-400">~</span>$ curl https://example.com/page</p>
          <p className="mt-1 text-red-400">&gt; HTTP 404 Not Found</p>
          <p className="mt-2 text-zinc-500">|</p>
          <p className="text-zinc-500">+--- The requested resource was not found on this server.</p>
          <p className="mt-3"><span className="text-cyan-400">user@host</span>:<span className="text-blue-400">~</span>$ <span className="animate-pulse">_</span></p>
          <div className="mt-4 flex gap-3">
            <button className="rounded bg-success px-3 py-1.5 text-xs text-white hover:bg-success/90">cd ~/home</button>
            <button className="rounded border border-zinc-600 px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800">clear &amp; retry</button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  });
