"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Car } from "@/src/constants/browse-cars";
import { getAllCars, getCars } from "@/src/lib/actions/cars-actions";

export function useBrowseLogic(carsData: Car[] = []) {


  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [likedCars, setLikedCars] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [cars, setCars] = useState<Awaited<ReturnType<typeof getCars>>>([]);

 

  useEffect(() => {
    const fetchCars = async () => {
      const cur = await getAllCars();
      setCars(cur);
    };
    fetchCars();
  }, []);

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

  const filteredCars = useMemo(() => {
    let filtered = carsData;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(query) ||
          car.brand.toLowerCase().includes(query) ||
          car.description.toLowerCase().includes(query)
      );
    }

    Object.entries(selectedFilters).forEach(([filterType, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter((car) => {
          switch (filterType) {
            case "fuelType":
              return values.includes(car.fuelType);
            case "transmission":
              return values.includes(car.transmission);
            case "priceRange":
              const price = car.price;
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

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "mileage-low":
          return a.mileage - b.mileage;
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

  const toggleLike = useCallback((carId: string) => {
    setLikedCars((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,
    selectedFilters,
    likedCars,
    isMobile,
    sortBy,
    setSortBy,
    cars,
    filteredCars,
    toggleFilter,
    toggleLike,
  };
}