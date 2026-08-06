import Link from "next/link";
import { NotFoundLayout, GoHomeButton } from "./NotFoundShell";

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

export function Matrix404() {
  const chars = "01アイウエオカキクケコ";
  return (
    <NotFoundLayout className="py-20 overflow-hidden" style={{ background: "#000", borderRadius: "12px", minHeight: "400px" }}>
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ fontFamily: "monospace", fontSize: "14px", color: "#0f0", lineHeight: "1.2", wordBreak: "break-all", overflow: "hidden" }}>
        {Array.from({ length: 200 }, (_, i) => chars[Math.floor(Math.random() * chars.length)]).join(" ")}
      </div>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-green-500" style={{ textShadow: "0 0 20px #0f0" }}>404</h1>
        <p className="mt-2 text-lg text-green-400">Wake up, Neo... The page doesn&apos;t exist.</p>
        <GoHomeButton className="mt-8 rounded border border-green-500 bg-transparent px-6 py-2.5 text-sm text-green-400 hover:bg-green-500/10" />
      </div>
    </NotFoundLayout>
  );
}

export function Cyberpunk404() {
  return (
    <NotFoundLayout className="py-20" style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="relative">
        <h1 className="text-[10rem] font-black text-cyan-400" style={{ textShadow: "0 0 10px #0ff, 0 0 40px #0ff", letterSpacing: "0.1em" }}>404</h1>
        <div className="absolute -top-2 -right-4 rounded bg-pink-500 px-2 py-0.5 text-[10px] font-bold text-white">ERROR</div>
      </div>
      <p className="mt-2 text-lg text-cyan-300" style={{ textShadow: "0 0 5px #0ff" }}>SYSTEM FAILURE: Page not found</p>
      <p className="mt-1 text-xs text-pink-400">NEURAL LINK DISCONNECTED</p>
      <GoHomeButton className="mt-8 rounded border-2 border-cyan-400 bg-transparent px-8 py-3 text-sm font-bold text-cyan-400 hover:bg-cyan-400/10" />
    </NotFoundLayout>
  );
}

export function Retro80s404() {
  return (
    <NotFoundLayout className="py-20" style={{ background: "linear-gradient(180deg, #1a0033, #4a0080, #ff00ff)", borderRadius: "12px", minHeight: "400px" }}>
      <h1 className="text-[10rem] font-black text-transparent" style={{ WebkitTextStroke: "3px #ff00ff", textShadow: "0 0 30px #ff00ff" }}>404</h1>
      <p className="mt-2 text-xl font-bold text-yellow-300" style={{ fontFamily: "'Courier New', monospace", textShadow: "2px 2px 0 #ff00ff" }}>TOTALLY TUBULAR 404</p>
      <p className="mt-1 text-sm text-pink-200">Like, this page is totally rad... but gone.</p>
      <GoHomeButton className="mt-8 rounded-full bg-fuchsia-500 px-8 py-3 text-sm font-bold text-white hover:bg-fuchsia-400" />
    </NotFoundLayout>
  );
}

export function Vaporwave404() {
  return (
    <NotFoundLayout className="py-20" style={{ background: "linear-gradient(180deg, #ffb6c1, #b19cd9, #7b68ee)", borderRadius: "12px", minHeight: "400px" }}>
      <h1 className="text-[10rem] font-bold text-white" style={{ textShadow: "4px 4px 0 #ff69b4, 8px 8px 0 #9370db" }}>404</h1>
      <p className="mt-2 text-xl font-bold text-white" style={{ fontFamily: "serif" }}>A E S T H E T I C</p>
      <p className="mt-1 text-sm text-white/80">This page has been vaporized.</p>
      <GoHomeButton className="mt-8 rounded bg-white/20 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30" />
    </NotFoundLayout>
  );
}

export function Steampunk404() {
  return (
    <NotFoundLayout className="py-20" style={{ background: "linear-gradient(135deg, #2c1810, #4a2c1a)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="flex items-center gap-4">
        <svg className="h-16 w-16 animate-spin" style={{ animationDuration: "8s" }} viewBox="0 0 24 24" fill="none" stroke="#b8860b" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
        <h1 className="text-[8rem] font-bold text-amber-600">404</h1>
        <svg className="h-16 w-16 animate-spin" style={{ animationDuration: "8s", animationDirection: "reverse" }} viewBox="0 0 24 24" fill="none" stroke="#b8860b" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      </div>
      <p className="mt-4 text-lg text-amber-200">The gears have stopped. Page not found.</p>
      <GoHomeButton className="mt-6 rounded-lg border-2 border-amber-600 bg-transparent px-6 py-2.5 text-sm font-medium text-amber-400 hover:bg-amber-600/10" />
    </NotFoundLayout>
  );
}
