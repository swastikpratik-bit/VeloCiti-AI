"use client";

import { Button } from "@/src/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Filter,
  Grid,
  List,
  Search,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CarCard } from "@/src/components/browse-car-card";
import { BROWSE_CARS, FILTERS } from "@/src/constants/browse-cars";

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [likedCars, setLikedCars] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // Check if mobile and force grid mode
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode("grid");
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Memoized filtered and sorted cars
  const filteredCars = useMemo(() => {
    let filtered = BROWSE_CARS;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(query) ||
          car.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    Object.entries(selectedFilters).forEach(([filterType, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter((car) => {
          switch (filterType) {
            case "fuelType":
              return values.includes(car.fuel);
            case "transmission":
              return values.includes(car.transmission);
            case "priceRange":
              const price = parseInt(car.price.replace(/[$,]/g, ""));
              return values.some(range => {
                switch (range) {
                  case "Under $50k": return price < 50000;
                  case "$50k - $100k": return price >= 50000 && price <= 100000;
                  case "$100k - $200k": return price >= 100000 && price <= 200000;
                  case "Over $200k": return price > 200000;
                  default: return true;
                }
              });
            default:
              return true;
          }
        });
      }
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[$,]/g, ""));
      const priceB = parseInt(b.price.replace(/[$,]/g, ""));
      const mileageA = parseInt(a.mileage.replace(/[^0-9]/g, "")) || 0;
      const mileageB = parseInt(b.mileage.replace(/[^0-9]/g, "")) || 0;

      switch (sortBy) {
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        case "mileage-low":
          return mileageA - mileageB;
        case "newest":
        default:
          return b.year - a.year;
      }
    });

    return filtered;
  }, [searchQuery, selectedFilters, sortBy]);

  const toggleFilter = useCallback((filterType: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType]?.includes(value)
        ? prev[filterType].filter((v) => v !== value)
        : [...(prev[filterType] || []), value],
    }));
  }, []);

  const toggleLike = useCallback((carId: number) => {
    setLikedCars((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  }, []);


 

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold mb-4">
              Browse <span className="text-cyan">AI Cars</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover thousands of AI-enhanced vehicles with intelligent search
              and filtering
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for cars, brands, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/50 border border-white/20 focus:border-cyan focus:outline-none"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
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

                {/* Hide list/grid toggle on mobile */}
                <div className="hidden md:flex border border-white/20 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 transition-colors ${
                      viewMode === "grid"
                        ? "bg-cyan text-black"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 transition-colors ${
                      viewMode === "list"
                        ? "bg-cyan text-black"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Show only grid icon on mobile (disabled/active state) */}
                <div className="md:hidden flex border border-white/20 rounded-lg overflow-hidden">
                  <button
                    className="p-3 bg-cyan text-black cursor-default"
                    disabled
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filters Panel */}
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
                      {Object.entries(FILTERS).map(([filterType, options]) => (
                        <div key={filterType}>
                          <h3 className="font-semibold mb-3 capitalize">
                            {filterType.replace(/([A-Z])/g, " $1").trim()}
                          </h3>
                          <div className="space-y-2">
                            {options.map((option) => (
                              <label
                                key={option}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedFilters[filterType]?.includes(
                                      option
                                    ) || false
                                  }
                                  onChange={() =>
                                    toggleFilter(filterType, option)
                                  }
                                  className="rounded border-white/20 text-cyan focus:ring-cyan"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Showing {filteredCars.length} of {BROWSE_CARS.length} cars
            </p>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-background/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="mileage-low">Mileage: Low to High</option>
            </select>
          </div>
        </div>
      </section>

      {/* Cars Grid/List */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className={`grid gap-6 ${
              isMobile || viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredCars.map((car, index) => (
              <CarCard
                key={car.id}
                car={car}
                index={index}
                viewMode={viewMode}
                isLiked={likedCars.includes(car.id)}
                onToggleLike={toggleLike}
                isMobile={isMobile}
              />
            ))}
          </motion.div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className="bg-cyan hover:bg-cyan/80 text-black font-semibold px-8 py-4 rounded-full magnetic-button"
            >
              Load More Cars
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
