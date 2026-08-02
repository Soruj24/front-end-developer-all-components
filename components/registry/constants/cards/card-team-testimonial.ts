import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardTeamTestimonial: RegistryEntry = entry({
    id: "card-team-testimonial",
    title: "Team & Testimonial Cards",
    description: "Team members and a customer quote card.",
    source: `const team = [
  { name: "Alice Johnson", role: "CEO & Founder", bio: "Building the future of web development" },
  { name: "Bob Martinez", role: "CTO", bio: "Architecting scalable systems" },
  { name: "Carol Smith", role: "Design Lead", bio: "Crafting beautiful user experiences" },
];

export default function CardTeamTestimonial() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member, i) => (
        <div key={i} className="rounded-lg border border-black/[.08] p-5 text-center dark:border-white/[.145]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-lg font-bold text-white">
            {member.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <h3 className="mt-3 font-semibold">{member.name}</h3>
          <p className="text-xs text-blue-600 dark:text-blue-400">{member.role}</p>
          <p className="mt-1 text-sm text-zinc-500">{member.bio}</p>
          <div className="mt-3 flex justify-center gap-3">
            {["🐦", "💼", "📷"].map((s) => (
              <span key={s} className="cursor-pointer text-zinc-400 hover:text-zinc-600">{s}</span>
            ))}
          </div>
        </div>
      ))}
      <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145] sm:col-span-2 lg:col-span-1">
        <div className="flex gap-1">
          {Array(5).fill(0).map((_, i) => (
            <svg key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="mt-2 text-sm italic text-zinc-600 dark:text-zinc-400">"This platform transformed how our team ships products."</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xs font-bold text-white">SC</div>
          <div>
            <p className="text-sm font-medium">Sarah Chen</p>
            <p className="text-xs text-zinc-500">CTO, TechStart</p>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  });
