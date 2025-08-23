"use client";

import { Home, Car, Plus, Brain } from "lucide-react";
import { Dock } from "@/src/components/ui/floating-dock";

export function NavigationDock() {
  const navItems = [
    {
      title: "Home",
      icon: <Home />,
      href: "/",
    },
    {
      title: "Browse Cars",
      icon: <Car />,
      href: "/browse",
    },
    {
      title: "AI Search",
      icon: <Brain />,
      href: "/aisearch",
    },
    {
      title: "Sell Car",
      icon: <Plus />,
      href: "/sell",
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <Dock items={navItems} className="glass glow-cyan" />
    </div>
  );
}
