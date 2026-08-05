"use client";

import { useState } from "react";

export function Card3DHero() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -10, y: x * 10 });
  }

  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
  }

  return (
    <div className="flex min-h-[50vh] items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-8">
      <div
        className="relative w-full max-w-lg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1000px" }}
      >
        <div
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute -right-4 -top-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3 shadow-lg" style={{ transform: "translateZ(30px)" }}>
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white" style={{ transform: "translateZ(20px)" }}>Interactive 3D Card</h3>
          <p className="mt-2 text-zinc-400" style={{ transform: "translateZ(10px)" }}>Move your mouse to tilt the card in 3D space. Pure CSS transforms, no libraries needed.</p>
          <div className="mt-6 flex gap-3" style={{ transform: "translateZ(15px)" }}>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">Try It</button>
            <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800">Source</button>
          </div>
        </div>
      </div>
    </div>
  );
}
