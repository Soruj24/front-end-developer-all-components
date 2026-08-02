import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { statusColorsSource, usersSource } from "./shared";

export const tableBasicStriped: RegistryEntry = entry({
    id: "table-basic-striped",
    title: "Striped Rows",
    description: "Alternating row colors for easier scanning.",
    source: `${usersSource}

${statusColorsSource}

export default function TableBasicStriped() {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            {["Name", "Role", "Status", "Last Login"].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {users.map((u, i) => (
            <tr key={u.id} className={\`\${i % 2 === 1 ? "bg-zinc-50/50 dark:bg-zinc-900/30" : ""} hover:bg-zinc-100 dark:hover:bg-zinc-800/50\`}>
              <td className="px-4 py-3 font-medium">{u.name}</td>
              <td className="px-4 py-3">{u.role}</td>
              <td className="px-4 py-3">
                <span className={\`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium \${statusColors[u.status]}\`}>{u.status}</span>
              </td>
              <td className="px-4 py-3 text-zinc-500">{u.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
  });
