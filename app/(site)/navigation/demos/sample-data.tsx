import {
  BookOpenIcon,
  BoxesIcon,
  CompassIcon,
  HistoryIcon,
  LayoutGridIcon,
  LifeBuoyIcon,
  PaletteIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import type { NavSection } from "@/types/navigation";

/** Sample sections rendered by the sidebar preview and playground. */
export const demoSections: NavSection[] = [
  {
    title: "Getting Started",
    icon: <CompassIcon className="h-3.5 w-3.5" />,
    links: [
      { label: "Introduction", href: "#introduction", icon: <BookOpenIcon className="h-3 w-3" /> },
      { label: "Navigation", href: "/navigation", icon: <CompassIcon className="h-3 w-3" /> },
      { label: "Theming", href: "#theming", icon: <PaletteIcon className="h-3 w-3" /> },
    ],
  },
  {
    title: "Components",
    icon: <LayoutGridIcon className="h-3.5 w-3.5" />,
    links: [
      { label: "Button", href: "#button", icon: <BoxesIcon className="h-3 w-3" /> },
      { label: "Card", href: "#card" },
      {
        label: "Dialog",
        href: "#dialog",
        children: [
          { label: "Alert Dialog", href: "#alert-dialog" },
          { label: "Confirmation", href: "#confirmation" },
        ],
      },
      { label: "Tabs", href: "#tabs" },
    ],
  },
  {
    title: "Resources",
    icon: <LifeBuoyIcon className="h-3.5 w-3.5" />,
    links: [
      { label: "Changelog", href: "#changelog", icon: <HistoryIcon className="h-3 w-3" /> },
      { label: "Community", href: "#community", icon: <UsersIcon className="h-3 w-3" /> },
      { label: "Settings", href: "#settings", icon: <SettingsIcon className="h-3 w-3" /> },
    ],
  },
];
