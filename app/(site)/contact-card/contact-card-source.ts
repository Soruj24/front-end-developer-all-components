export const CONTACT_CARD_SOURCE = `"use client";

import { useState } from "react";

interface ContactCardProps {
  name: string;
  role?: string;
  email?: string;
  className?: string;
}

export function ContactCard({ name, role, email, className = "" }: ContactCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`rounded-xl border border-border bg-card p-6 ${className} transition-colors dark:border-border dark:bg-zinc-900 hover:bg-muted/50 dark:hover:bg-muted/20`}>
      <div className="flex flex-col items-center text-center">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">
          {name.split(" ")[0].charAt(0)}
        </div>
        <h3 className="mt-3 font-semibold text-sm">{name}</h3>
        {role && <p className="text-xs text-muted-foreground">{role}</p>}
      </div>
      {email && <p className="mt-2 text-xs text-muted-foreground">{email}</p>}
      <div className="mt-4 flex gap-2">
        <button className="flex-1 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium">Message</button>
        <button className="flex-1 py-2 rounded-md bg-muted text-foreground text-xs font-medium">Profile</button>
      </div>
    </div>
  );
}`;

export const BASIC_EXAMPLE = `<ContactCard name="Jane Doe" role="Senior Engineer" email="jane@example.com" />`;

export const DETAILED_EXAMPLE = `<ContactCard name="Alex Brown" role="Product Designer" email="alex@company.com" />`;

export const COMPACT_EXAMPLE = `<ContactCard name="Sarah Chen" role="Frontend Dev" />`;
`;