import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const avatarWithLabel: RegistryEntry = entry({
    id: "avatar-with-label",
    title: "With Name/Label Below",
    description: "Avatar stacked above the user name and handle.",
    source: `const people = [
  { initials: "JD", name: "John Doe", color: "from-blue-400 to-purple-500" },
  { initials: "AK", name: "Alice Kim", color: "from-emerald-400 to-cyan-500" },
  { initials: "ML", name: "Mike Lee", color: "from-pink-400 to-orange-500" },
  { initials: "RS", name: "Rachel Sun", color: "from-yellow-400 to-red-500" },
];

export default function AvatarWithLabel() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      {people.map((person) => (
        <div key={person.initials} className="flex flex-col items-center gap-2">
          <div className={\`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br \${person.color} text-lg font-medium text-white\`}>
            {person.initials}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">{person.name}</p>
            <p className="text-xs text-zinc-500">@{person.name.toLowerCase().replace(" ", ".")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}`,
  });
