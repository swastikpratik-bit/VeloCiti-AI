"use client";

import { Grid, List } from "lucide-react";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  isMobile: boolean;
}

export function ViewToggle({ viewMode, onViewModeChange, isMobile }: ViewToggleProps) {
  if (isMobile) {
    return (
      <div className="md:hidden flex border border-white/20 rounded-lg overflow-hidden">
        <button className="p-3 bg-cyan text-black cursor-default" disabled>
          <Grid className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex border border-white/20 rounded-lg overflow-hidden">
      <button
        onClick={() => onViewModeChange("grid")}
        className={`p-3 transition-colors ${
          viewMode === "grid" ? "bg-cyan text-black" : "hover:bg-white/10"
        }`}
      >
        <Grid className="h-4 w-4" />
      </button>
      <button
        onClick={() => onViewModeChange("list")}
        className={`p-3 transition-colors ${
          viewMode === "list" ? "bg-cyan text-black" : "hover:bg-white/10"
        }`}
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
}