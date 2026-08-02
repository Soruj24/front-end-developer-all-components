/**
 * Shared carousel data + component helper. Interpolated into every carousel
 * source so each emitted example is self-contained.
 */
export const carouselData = `const COLORS = ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400", "bg-pink-400"];
const LABELS = ["Red", "Blue", "Green", "Yellow", "Purple", "Pink"];`;

export const carouselSource = `function Carousel({
  slides = LABELS, colors = COLORS, autoPlay = false, interval = 3000, transition = "slide",
  showDots = true, showArrows = true, showCounter = true, showThumbs = false, loop = true,
  height = "h-64",
}: {
  slides?: string[]; colors?: string[]; autoPlay?: boolean; interval?: number;
  transition?: "slide" | "fade" | "slide-3d" | "scale"; showDots?: boolean; showArrows?: boolean;
  showCounter?: boolean; showThumbs?: boolean; loop?: boolean; height?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const len = slides.length;

  const prev = useCallback(() => setIdx((i) => (i === 0 ? (loop ? len - 1 : i) : i - 1)), [len, loop]);
  const next = useCallback(() => setIdx((i) => (i === len - 1 ? (loop ? 0 : i) : i + 1)), [len, loop]);

  useEffect(() => {
    if (!autoPlay || hovered) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [autoPlay, hovered, interval, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const transClass =
    transition === "slide" || transition === "slide-3d"
      ? "transition-transform duration-500"
      : transition === "fade"
        ? "transition-opacity duration-500"
        : "transition-all duration-500";

  return (
    <div
      className={\`relative mx-auto w-full max-w-2xl overflow-hidden rounded-xl \${height}\`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0} role="region" aria-label="Carousel"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        {transition === "slide" && (
          <div className="flex h-full w-full" style={{ transform: \`translateX(-\${idx * 100}%)\` }}>
            {slides.map((s, i) => (
              <div key={i} className={\`flex h-full w-full shrink-0 items-center justify-center text-2xl font-bold text-white \${colors[i % colors.length]}\`}>
                {s}
              </div>
            ))}
          </div>
        )}
        {transition === "fade" && slides.map((s, i) => (
          <div key={i} className={\`absolute inset-0 flex items-center justify-center text-2xl font-bold text-white \${colors[i % colors.length]} \${transClass} \${i === idx ? "opacity-100" : "opacity-0 pointer-events-none"}\`}>
            {s}
          </div>
        ))}
        {transition === "scale" && slides.map((s, i) => (
          <div key={i} className={\`absolute inset-0 flex items-center justify-center text-2xl font-bold text-white \${colors[i % colors.length]} \${transClass} \${i === idx ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"}\`}>
            {s}
          </div>
        ))}
        {transition === "slide-3d" && (
          <div className="flex h-full w-full" style={{ transform: \`translateX(-\${idx * 100}%)\` }}>
            {slides.map((s, i) => (
              <div key={i} className={\`flex h-full w-full shrink-0 items-center justify-center text-2xl font-bold text-white \${colors[i % colors.length]}\`} style={{ perspective: "1000px", transform: "rotateY(0deg)" }}>
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {showArrows && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60" aria-label="Previous">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60" aria-label="Next">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}

      {showDots && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={\`h-2.5 w-2.5 rounded-full transition-colors \${i === idx ? "bg-white" : "bg-white/40"}\`} aria-label={\`Go to slide \${i + 1}\`} />
          ))}
        </div>
      )}

      {showCounter && (
        <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded bg-black/40 px-2 py-0.5 text-xs text-white">
          {idx + 1} / {len}
        </div>
      )}

      {showThumbs && (
        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((s, i) => (
            <button key={i} onClick={() => setIdx(i)} className={\`h-6 w-8 rounded \${colors[i % colors.length]} \${i === idx ? "ring-2 ring-white" : "opacity-60"}\`} />
          ))}
        </div>
      )}
    </div>
  );
}`;
