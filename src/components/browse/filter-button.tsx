"use client";

import { Button } from "@/src/components/ui/button";
import { ChevronDown, Filter } from "lucide-react";

interface FilterButtonProps {
  showFilters: boolean;
  onToggleFilters: () => void;
}

export function FilterButton({ showFilters, onToggleFilters }: FilterButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onToggleFilters}
      className="border-cyan/50 text-cyan hover:bg-cyan/10"
    >
      <Filter className="h-4 w-4 mr-2" />
      Filters
      <ChevronDown
        className={`h-4 w-4 ml-2 transition-transform ${
          showFilters ? "rotate-180" : ""
        }`}
      />
    </Button>
  );
}