"use client";
import { cn } from "@/src/lib/utils";
import { useState } from "react";

export const Dock = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "mx-auto h-16 items-center gap-4 rounded-2xl glass px-6 flex relative",
        className
      )}
    >
      {items.map((item) => (
        <div key={item.title} className="relative">
          <a
            href={item.href}
            className="flex items-center justify-center w-10 h-10 rounded-full glass hover:glow-cyan transition-colors duration-200"
            onMouseEnter={() => setHoveredItem(item.title)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="w-5 h-5 text-cyan flex items-center justify-center">
              {item.icon}
            </div>
          </a>

          {hoveredItem === item.title && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap z-10 shadow-lg">
              {item.title}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
