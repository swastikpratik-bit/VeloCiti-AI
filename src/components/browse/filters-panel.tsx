"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FILTERS } from "@/src/constants/browse-cars";

const DISPLAY_FILTERS = {
  priceRange: ["Under $50k", "$50k - $100k", "$100k - $200k", "Over $200k"],
  fuelType: ["Electric", "Hybrid", "Gasoline"],
  transmission: ["Auto", "Manual"],
};

const FILTER_MAPPING = {
  fuelType: {
    "Electric": "ELECTRIC",
    "Hybrid": "HYBRID",
    "Gasoline": "GASOLINE"
  },
  transmission: {
    "Auto": "AUTO",
    "Manual": "MANUAL"
  }
};

interface FiltersPanelProps {
  showFilters: boolean;
  selectedFilters: Record<string, string[]>;
  onToggleFilter: (filterType: string, value: string) => void;
}

export function FiltersPanel({ showFilters, selectedFilters, onToggleFilter }: FiltersPanelProps) {
  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-6 border-t border-white/10 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(DISPLAY_FILTERS).map(([filterType, options]) => (
                <div key={filterType}>
                  <h3 className="font-semibold mb-3 capitalize">
                    {filterType.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <div className="space-y-2">
                    {options.map((option) => {
                      const mappedValue = FILTER_MAPPING[filterType as keyof typeof FILTER_MAPPING]?.[option as keyof typeof FILTER_MAPPING[keyof typeof FILTER_MAPPING]] || option;
                      return (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedFilters[filterType]?.includes(mappedValue) || false
                            }
                            onChange={() => onToggleFilter(filterType, mappedValue)}
                            className="rounded border-white/20 text-cyan focus:ring-cyan"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}