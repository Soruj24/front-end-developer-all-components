import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const modalGallery: RegistryEntry = entry({
    id: "modal-gallery",
    title: "Image Gallery",
    description: "A lightbox gallery modal with thumbnails and dot navigation.",
    source: `import { useEffect, useRef, useState } from "react";

const IMAGES = [
  { src: "/api/placeholder/800/500", label: "Mountain View" },
  { src: "/api/placeholder/800/500", label: "Ocean Sunset" },
  { src: "/api/placeholder/800/500", label: "City Skyline" },
  { src: "/api/placeholder/800/500", label: "Forest Trail" },
  { src: "/api/placeholder/800/500", label: "Desert Dunes" },
];

function GalleryModal({ open, onClose, children }) {
  const ref = useRef(null);
  const previous = useRef(null);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setAnim(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open || !ref.current) return;
    previous.current = document.activeElement;
    const f = ref.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = f[0];
    const last = f[f.length - 1];
    first && first.focus();
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last && last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first && first.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (previous.current instanceof HTMLElement) previous.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={\`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 \${anim ? "opacity-100" : "opacity-0"}\`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={\`relative z-10 mx-4 w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 dark:bg-zinc-900 \${anim ? "scale-100 opacity-100" : "scale-75 opacity-0"}\`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default function ModalGallery() {
  const [galleryId, setGalleryId] = useState(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full grid-cols-5 gap-3">
        {IMAGES.map((img, i) => (
          <button
            key={i}
            onClick={() => {
              setGalleryId(i);
              setGalleryIdx(i);
            }}
            className="overflow-hidden rounded-xl border border-zinc-200 transition-opacity hover:opacity-80 dark:border-zinc-800"
          >
            <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-800" />
            <div className="p-2 text-xs font-medium">{img.label}</div>
          </button>
        ))}
      </div>
      <GalleryModal open={galleryId !== null} onClose={() => setGalleryId(null)}>
        <div className="flex flex-col items-center">
          <div className="mb-4 h-64 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800" />
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{IMAGES[galleryIdx]?.label}</p>
          <div className="mt-4 flex gap-2">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalleryIdx(i)}
                className={\`h-2 w-2 rounded-full \${i === galleryIdx ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-600"}\`}
              />
            ))}
          </div>
        </div>
      </GalleryModal>
    </div>
  );
}`,
  });
