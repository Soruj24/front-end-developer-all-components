"use client";

import { useState } from "react";
import { TabBar } from "@/components/ui/TabBar";
import type { TabBarTab } from "@/components/ui/TabBar";
import {
  Home, Search, PlusCircle, User, Bell, MessageSquare, Settings, ShoppingCart, Heart, Grid3X3,
} from "lucide-react";

const defaultTabs: TabBarTab[] = [
  { id: "home", icon: <Home className="h-5 w-5" />, label: "Home" },
  { id: "search", icon: <Search className="h-5 w-5" />, label: "Search" },
  { id: "add", icon: <PlusCircle className="h-5 w-5" />, label: "Post" },
  { id: "notifications", icon: <Bell className="h-5 w-5" />, label: "Alerts", badge: 3 },
  { id: "profile", icon: <User className="h-5 w-5" />, label: "Profile" },
];

const shopTabs: TabBarTab[] = [
  { id: "home", icon: <Home className="h-5 w-5" />, label: "Shop" },
  { id: "search", icon: <Search className="h-5 w-5" />, label: "Browse" },
  { id: "cart", icon: <ShoppingCart className="h-5 w-5" />, label: "Cart", badge: 2 },
  { id: "wishlist", icon: <Heart className="h-5 w-5" />, label: "Saved" },
  { id: "profile", icon: <User className="h-5 w-5" />, label: "Account" },
];

const socialTabs: TabBarTab[] = [
  { id: "feed", icon: <Home className="h-5 w-5" />, label: "Feed" },
  { id: "explore", icon: <Grid3X3 className="h-5 w-5" />, label: "Explore" },
  { id: "messages", icon: <MessageSquare className="h-5 w-5" />, label: "Messages", badge: 12 },
  { id: "notifications", icon: <Bell className="h-5 w-5" />, label: "Activity" },
  { id: "profile", icon: <User className="h-5 w-5" />, label: "You" },
];

export function DefaultDemo() {
  const [active, setActive] = useState("home");
  return (
    <div className="w-full max-w-sm">
      <TabBar tabs={defaultTabs} active={active} onChange={setActive} />
    </div>
  );
}

export function FilledDemo() {
  const [active, setActive] = useState("home");
  return (
    <div className="w-full max-w-sm">
      <TabBar tabs={defaultTabs} active={active} onChange={setActive} variant="filled" />
    </div>
  );
}

export function PillDemo() {
  const [active, setActive] = useState("feed");
  return (
    <div className="w-full max-w-sm">
      <TabBar tabs={socialTabs} active={active} onChange={setActive} variant="pill" />
    </div>
  );
}

export function FloatingDemo() {
  const [active, setActive] = useState("home");
  return (
    <div className="w-full max-w-sm">
      <TabBar tabs={shopTabs} active={active} onChange={setActive} variant="floating" />
    </div>
  );
}

export function IconOnlyDemo() {
  const [active, setActive] = useState("home");
  return (
    <div className="w-full max-w-sm">
      <TabBar tabs={defaultTabs} active={active} onChange={setActive} iconOnly />
    </div>
  );
}
