import * as React from "react";
import { cn } from "@/lib/cn";
import type { NavigationMenuProps, NavigationMenuItems } from "./NavigationMenu.types";
import { NAVIGATION_MENU_STYLES } from "./NavigationMenu.constants";

export function NavigationMenu({ items, orientation = "vertical", className, itemClassName }: NavigationMenuProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const renderItems = (items: NavigationMenuItems[], submenu = false) => (
    <>
      {items.map((item) => (
        <div key={item.label} className="relative">
          <div
            className={cn(
              NAVIGATION_MENU_STYLES.item,
              submenu && NAVIGATION_MENU_STYLES.submenu,
              openItem === item.label && NAVIGATION_MENU_STYLES.itemActive,
              item.className,
              itemClassName,
            )}
            onClick={() => { if (item.children) setOpenItem(openItem === item.label ? null : item.label); item.onClick?.(); }}
          >
            {item.icon && <span className={NAVIGATION_MENU_STYLES.icon}>{item.icon}</span>}
            <span>{item.label}</span>
            {item.children && <span className="ml-auto text-muted-foreground/50">▸</span>}
          </div>
          {item.children && openItem === item.label && (
            <div className="ml-4">
              {renderItems(item.children, true)}
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <nav className={cn(NAVIGATION_MENU_STYLES.base, orientation === "horizontal" && NAVIGATION_MENU_STYLES.horizontal, className)}>
      {renderItems(items)}
    </nav>
  );
}
