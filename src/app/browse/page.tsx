"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Eye,
  Filter,
  Grid,
  Heart,
  List,
  Search,
  Zap
} from "lucide-react";
import Link from 'next/link';
import { useEffect, useState } from "react";


const cars = [
  {
    id: 1,
    name: "Tesla Model S Plaid",
    price: "$129,990",
    image:
      "https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800",
    year: 2024,
    mileage: "0 miles",
    fuel: "Electric",
    transmission: "Auto",
    location: "San Francisco, CA",
    aiGenerated: true,
    tags: ["Electric", "Luxury", "Performance"],
  },
  {
    id: 2,
    name: "BMW i8 Roadster",
    price: "$148,495",
    image:
      "https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=800",
    year: 2023,
    mileage: "1,200 miles",
    fuel: "Hybrid",
    transmission: "Auto",
    location: "Los Angeles, CA",
    aiGenerated: false,
    tags: ["Hybrid", "Sports", "Convertible"],
  },
  {
    id: 3,
    name: "Porsche Taycan Turbo S",
    price: "$185,000",
    image:
      "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800",
    year: 2024,
    mileage: "500 miles",
    fuel: "Electric",
    transmission: "Auto",
    location: "Miami, FL",
    aiGenerated: true,
    tags: ["Electric", "Luxury", "Performance"],
  },
  {
    id: 4,
    name: "Lamborghini Huracán",
    price: "$208,571",
    image:
      "https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=800",
    year: 2023,
    mileage: "800 miles",
    fuel: "Gasoline",
    transmission: "Auto",
    location: "New York, NY",
    aiGenerated: false,
    tags: ["Gasoline", "Supercar", "Performance"],
  },
  {
    id: 5,
    name: "Audi e-tron GT",
    price: "$102,400",
    image:
      "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800",
    year: 2024,
    mileage: "0 miles",
    fuel: "Electric",
    transmission: "Auto",
    location: "Seattle, WA",
    aiGenerated: true,
    tags: ["Electric", "Luxury", "Sedan"],
  },
  {
    id: 6,
    name: "Mercedes-AMG GT",
    price: "$118,600",
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
    year: 2023,
    mileage: "2,100 miles",
    fuel: "Gasoline",
    transmission: "Auto",
    location: "Chicago, IL",
    aiGenerated: false,
    tags: ["Gasoline", "Sports", "Coupe"],
  },
];

const filters = {
  priceRange: ["Under $50k", "$50k - $100k", "$100k - $200k", "Over $200k"],
  fuelType: ["Electric", "Hybrid", "Gasoline"],
  transmission: ["Auto", "Manual"],
};

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [likedCars, setLikedCars] = useState<number[]>([]);
  const [filteredCars, setFilteredCars] = useState(cars);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile and force grid mode
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      if (mobile) {
        setViewMode("grid"); // Force grid on mobile
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let filtered = cars;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Other filters
    Object.entries(selectedFilters).forEach(([filterType, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter((car) => {
          switch (filterType) {
            case "fuelType":
              return values.includes(car.fuel);
            // case "year":
            //   return values.includes(car.year.toString());
            case "transmission":
              return values.includes(car.transmission);
            default:
              return true;
          }
        });
      }
    });

    setFilteredCars(filtered);
  }, [searchQuery, selectedFilters]);

  const toggleFilter = (filterType: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType]?.includes(value)
        ? prev[filterType].filter((v) => v !== value)
        : [...(prev[filterType] || []), value],
    }));
  };

  const toggleLike = (carId: number) => {
    setLikedCars((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  };

  // Use grid mode for mobile, respect viewMode for desktop
  const effectiveViewMode = isMobile ? "grid" : viewMode;


 

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
                      {Object.entries(filters).map(([filterType, options]) => (
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
              Showing {filteredCars.length} of {cars.length} cars
            </p>
            <select className="bg-background/50 border border-white/20 rounded-lg px-3 py-2 text-sm">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Mileage: Low to High</option>
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
              effectiveViewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredCars.map((car, index) => (
              <Link href={`/browse/${car.id}`} key={car.id} >
                <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group cursor-pointer ${
                  effectiveViewMode === "list" && !isMobile ? "flex gap-6" : ""
                }`}
              
              >
                <div
                  className={`glass rounded-2xl overflow-hidden hover:glow-cyan transition-all duration-300 group-hover:scale-105 ${
                    effectiveViewMode === "list" && !isMobile
                      ? "flex w-full"
                      : ""
                  }`}
                >
                  <div
                    className={`relative ${
                      effectiveViewMode === "list" && !isMobile
                        ? "w-80 flex-shrink-0"
                        : ""
                    }`}
                  >
                    <div
                      className={`overflow-hidden ${
                        effectiveViewMode === "list" && !isMobile
                          ? "h-48"
                          : "aspect-video"
                      }`}
                    >
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* AI Badge */}
                    {car.aiGenerated && (
                      <Badge className="absolute top-3 left-3 bg-cyan/90 text-black">
                        <Zap className="h-3 w-3 mr-1" />
                        AI Enhanced
                      </Badge>
                    )}

                    {/* Action buttons */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(car.id);
                        }}
                        className={`p-2 rounded-full glass ${
                          likedCars.includes(car.id)
                            ? "text-red-500"
                            : "text-white"
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            likedCars.includes(car.id) ? "fill-current" : ""
                          }`}
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full glass text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>

                  <div
                    className={`p-6 ${
                      effectiveViewMode === "list" && !isMobile
                        ? "flex-1 flex flex-col justify-between"
                        : ""
                    }`}
                  >
                    <div>
                      <h3 className="text-xl font-outfit font-semibold mb-2 group-hover:text-cyan transition-colors">
                        {car.name}
                      </h3>
                      <p className="text-2xl font-bold text-cyan mb-4">
                        {car.price}
                      </p>

                      <div
                        className={`gap-3 text-sm text-muted-foreground mb-4 ${
                          effectiveViewMode === "list" && !isMobile
                            ? "flex flex-wrap"
                            : "grid grid-cols-2"
                        }`}
                      >
                        <div>
                          <span className="font-medium">Year:</span> {car.year}
                        </div>
                        <div>
                          <span className="font-medium">Fuel:</span> {car.fuel}
                        </div>
                        <div>
                          <span className="font-medium">Mileage:</span>{" "}
                          {car.mileage}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span>{" "}
                          {car.location}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {car.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-cyan/30 text-cyan"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {effectiveViewMode === "list" && !isMobile && (
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-cyan hover:bg-cyan/80 text-black">
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          className="border-cyan/50 text-cyan"
                        >
                          Contact
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                </motion.div>
              </Link>
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
