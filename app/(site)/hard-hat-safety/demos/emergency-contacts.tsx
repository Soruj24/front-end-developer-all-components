import { Phone } from "lucide-react";

const contacts = [
  { name: "Site Manager", phone: "+1 (555) 123-4567", role: "Primary Contact" },
  { name: "Safety Officer", phone: "+1 (555) 234-5678", role: "Safety Issues" },
  { name: "Emergency Services", phone: "911", role: "Emergencies" },
];

export function EmergencyContactsDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Emergency Contacts</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {contacts.map((c) => (
            <div key={c.name} className="flex items-center gap-3 rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
                <Phone className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold">{c.name}</p>
                <p className="text-[9px] text-muted-foreground">{c.role}</p>
              </div>
              <span className="text-xs font-mono font-bold">{c.phone}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
