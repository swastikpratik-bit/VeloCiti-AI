"use client";

import { motion } from "framer-motion";
import { SearchBar } from "./search-bar";
import { FilterButton } from "./filter-button";
import { ViewToggle } from "./view-toggle";
import { FiltersPanel } from "./filters-panel";

interface SearchControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  isMobile: boolean;
  selectedFilters: Record<string, string[]>;
  onToggleFilter: (filterType: string, value: string) => void;
}

export function SearchControls({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
  viewMode,
  onViewModeChange,
  isMobile,
  selectedFilters,
  onToggleFilter,
}: SearchControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="glass rounded-2xl p-6 mb-8"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
        <div className="flex gap-3">
          <FilterButton showFilters={showFilters} onToggleFilters={onToggleFilters} />
          <ViewToggle
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            isMobile={isMobile}
          />
        </div>
      </div>
      <FiltersPanel
        showFilters={showFilters}
        selectedFilters={selectedFilters}
        onToggleFilter={onToggleFilter}
      />
    </motion.div>
  );
}