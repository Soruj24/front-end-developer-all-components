import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const modalUseCases: RegistryEntry = entry({
    id: "modal-use-cases",
    title: "Modal Use Cases",
    description: "Terms, media preview, sharing, and feedback flows.",
    source: `export default function ModalUseCases() {
  const USE_CASES = [
    { title: "Terms of Service", desc: "Scrollable agreement with accept/decline." },
    { title: "Media Preview", desc: "Lightbox image/video viewer." },
    { title: "Share Dialog", desc: "Social sharing with copy link." },
    { title: "Feedback Form", desc: "Rate and review modal." },
  ];
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {USE_CASES.map((u) => (
        <div key={u.title} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <div className="text-sm font-medium">{u.title}</div>
          <div className="mt-1 text-xs text-zinc-500">{u.desc}</div>
        </div>
      ))}
    </div>
  );
}`,
  });
