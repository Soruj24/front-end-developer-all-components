import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const avatarPresence: RegistryEntry = entry({
    id: "avatar-presence",
    title: "Presence Indicator (Status + Name)",
    description: "Status dot with an availability caption.",
    source: `const people = [
  { initials: "JD", name: "John Doe", status: "bg-green-500", text: "Active now" },
  { initials: "AK", name: "Alice Kim", status: "bg-yellow-500", text: "Away for 10m" },
  { initials: "ML", name: "Mike Lee", status: "bg-red-500", text: "In a meeting" },
  { initials: "RS", name: "Rachel Sun", status: "bg-zinc-400", text: "Offline" },
];

export default function AvatarPresence() {
  return (
    <div className="flex flex-col gap-4">
      {people.map((person) => (
        <div key={person.initials} className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-medium text-white">
              {person.initials}
            </div>
            <span className={\`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white dark:ring-zinc-900 \${person.status}\`} />
          </div>
          <div>
            <p className="text-sm font-medium">{person.name}</p>
            <p className="text-xs text-zinc-500">{person.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}`,
  });
