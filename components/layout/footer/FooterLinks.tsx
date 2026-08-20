import Link from "next/link";
import { cn } from "@/lib/cn";
import { TEXT, TRANSITION, COLOR } from "@/constants/tokens";

interface FooterLinksProps {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <nav aria-label={title}>
      <h3 className={cn("font-semibold uppercase tracking-widest", TEXT.small, COLOR.muted)}>
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={cn(TEXT.body, COLOR.muted, TRANSITION.colors, "hover:text-foreground")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
