import Image from "next/image";
import { cn } from "@/lib/cn";
import { contacts } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function ContactTable() {
  return (
    <SectionCard title="Contact List" description="5 contacts with key details and deal values">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="pb-3 pr-4 font-medium">Contact</th>
              <th scope="col" className="pb-3 pr-4 font-medium">Company</th>
              <th scope="col" className="pb-3 pr-4 font-medium">Email</th>
              <th scope="col" className="pb-3 pr-4 font-medium">Phone</th>
              <th scope="col" className="pb-3 pr-4 font-medium">Status</th>
              <th scope="col" className="pb-3 text-right font-medium">Deal Value</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-b border-border/40 last:border-0 transition-colors hover:bg-muted/30">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <Image src={c.image} alt={c.name} width={32} height={32} className="rounded-full object-cover" />
                    <span className="font-medium text-foreground">{c.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-muted-foreground">{c.company}</td>
                <td className="py-3 pr-4 text-muted-foreground">{c.email}</td>
                <td className="py-3 pr-4 text-muted-foreground">{c.phone}</td>
                <td className="py-3 pr-4"><Badge variant={c.status}>{c.status}</Badge></td>
                <td className="py-3 text-right font-medium text-foreground">${c.dealValue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
