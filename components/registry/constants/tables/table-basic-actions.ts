import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { usersSource } from "./shared";

export const tableBasicActions: RegistryEntry = entry({
    id: "table-basic-actions",
    title: "Actions",
    description: "Each row includes action buttons for editing or deleting.",
    source: `${usersSource}

export default function TableBasicActions() {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            {["Name", "Email", "Role", "Actions"].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {users.slice(0, 4).map(u => (
            <tr key={u.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <td className="px-4 py-3 font-medium">{u.name}</td>
              <td className="px-4 py-3 text-zinc-500">{u.email}</td>
              <td className="px-4 py-3"><span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium dark:bg-zinc-800">{u.role}</span></td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button className="rounded px-2 py-1 text-xs font-medium text-primary hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20">View</button>
                  <button className="rounded px-2 py-1 text-xs font-medium text-warning hover:bg-warning-soft dark:text-warning dark:hover:bg-amber-900/20">Edit</button>
                  <button className="rounded px-2 py-1 text-xs font-medium text-danger hover:bg-danger-soft dark:text-red-400 dark:hover:bg-red-900/20">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
  });
