import Link from "next/link";
import { NotFoundLayout } from "./NotFoundShell";

export function Dark404() {
  return (
    <NotFoundLayout className="bg-zinc-950 py-20" style={{ borderRadius: "12px", minHeight: "400px" }}>
      <h1
        className="text-[10rem] font-bold text-transparent"
        style={{ textShadow: "0 0 40px #a78bfa, 0 0 80px #a78bfa, 0 0 120px #7c3aed", WebkitTextStroke: "2px #a78bfa" }}
      >
        404
      </h1>
      <p className="mt-2 text-lg text-muted-foreground/70" style={{ textShadow: "0 0 20px #a78bfa55" }}>Lost in the dark</p>
      <Link href="/" className="mt-8 rounded-lg border border-violet-400 bg-transparent px-6 py-3 text-sm font-medium text-violet-300 transition-all hover:bg-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30">Escape →</Link>
    </NotFoundLayout>
  );
}

export function BrokenRobot404() {
  return (
    <NotFoundLayout className="py-16 font-mono">
      <span className="text-6xl">🤖</span>
      <p className="mt-4 text-xl text-muted-foreground dark:text-zinc-200"><em>beep boop</em> page not found</p>
      <pre className="mt-6 text-xs leading-tight text-green-600 dark:text-green-400">
{`     [ERROR 0x404]
  .----------.
 /   SYSTEMS  \
|   FAILURE    |
 \   ☠       /
  '----------'
      |  |
     (  )`}
      </pre>
      <Link href="/" className="mt-8 rounded bg-green-600 px-6 py-2.5 font-mono text-sm text-white hover:bg-green-700">reboot.exe</Link>
    </NotFoundLayout>
  );
}

export function Glitch404() {
  return (
    <NotFoundLayout className="py-20">
      <div className="relative">
        <h1 className="text-[10rem] font-bold text-foreground" style={{ animation: "glitch1 3s infinite" }}>404</h1>
        <h1 className="absolute inset-0 text-[10rem] font-bold text-cyan-500" style={{ animation: "glitch2 2.5s infinite", top: 0 }} aria-hidden>404</h1>
        <h1 className="absolute inset-0 text-[10rem] font-bold text-pink-500" style={{ animation: "glitch3 3.5s infinite", top: 0 }} aria-hidden>404</h1>
      </div>
      <p className="mt-4 text-lg text-muted-foreground">Page glitched out</p>
      <Link href="/" className="mt-8 rounded border-2 border-zinc-900 bg-transparent px-6 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white dark:border-border dark:text-zinc-100 dark:hover:bg-muted dark:hover:text-foreground">Reset</Link>
    </NotFoundLayout>
  );
}

export function GameOver404() {
  return (
    <NotFoundLayout
      className="py-16"
      style={{ background: "#111", borderRadius: "12px", minHeight: "400px", fontFamily: "'Courier New', monospace" }}
    >
      <div className="space-y-1 text-2xl font-bold tracking-[0.5em] text-red-500">
        <p>GAME</p>
        <p>OVER</p>
      </div>
      <div className="mt-6 h-1 w-32 bg-red-500/30" />
      <p className="mt-6 text-5xl font-bold text-muted-foreground">404</p>
      <p className="mt-2 text-sm tracking-widest text-muted-foreground">LEVEL NOT FOUND</p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="border border-danger/50 px-8 py-2 text-sm tracking-wider text-red-400 transition-all hover:bg-red-500/20">RESTART</Link>
        <button onClick={() => window.location.reload()} className="border border-zinc-600 px-8 py-2 text-sm tracking-wider text-muted-foreground transition-all hover:bg-zinc-700">RETRY</button>
      </div>
    </NotFoundLayout>
  );
}

export function Terminal404() {
  return (
    <div className="font-mono" style={{ background: "#0d1117", borderRadius: "12px", minHeight: "400px" }}>
      <div className="flex items-center gap-1.5 border-b border-zinc-700 px-4 py-2.5">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-3 text-xs text-muted-foreground">terminal — 404</span>
      </div>
      <div className="p-6 text-sm leading-relaxed text-green-400">
        <p><span className="text-cyan-400">user@host</span>:<span className="text-blue-400">~</span>$ curl https://example.com/page</p>
        <p className="mt-1 text-red-400">&gt; HTTP 404 Not Found</p>
        <p className="mt-2 text-muted-foreground">|</p>
        <p className="text-muted-foreground">+--- The requested resource was not found on this server.</p>
        <p className="mt-4"><span className="text-cyan-400">user@host</span>:<span className="text-blue-400">~</span>$ <span className="animate-pulse">_</span></p>
        <div className="mt-6 flex gap-4">
          <Link href="/" className="rounded bg-green-600 px-4 py-1.5 text-xs text-white hover:bg-green-700">cd ~/home</Link>
          <button onClick={() => window.location.reload()} className="rounded border border-zinc-600 px-4 py-1.5 text-xs text-muted-foreground/70 hover:bg-muted">clear &amp; retry</button>
        </div>
      </div>
    </div>
  );
}
