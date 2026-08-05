"use client";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">
            JD<span className="text-blue-500">.</span>
          </span>
          <span className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} John Doe. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white">
            GitHub
          </a>
          <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white">
            LinkedIn
          </a>
          <a href="https://twitter.com/johndoe" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
