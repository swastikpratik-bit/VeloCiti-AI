"use client";

import { motion } from "framer-motion";
import { CarCard } from "@/src/components/browse-car-card";
import { Car } from "@/src/constants/browse-cars";

interface CarsGridProps {
  cars: Car[];
  viewMode: "grid" | "list";
  isMobile: boolean;
  likedCars: string[];
  onToggleLike: (carId: string) => void;
}

export function CarsGrid({ cars, viewMode, isMobile, likedCars, onToggleLike }: CarsGridProps) {

  return (
    <motion.div
      layout
      className={`grid gap-6 ${
        isMobile || viewMode === "grid"
          ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          : "grid-cols-1"
      }`}
    >
      {cars.map((car, index) => {
  

        return(
       
        <CarCard
          key={car.id}
          car={car}
          index={index}
          viewMode={viewMode}
          isLiked={likedCars.includes(car.id)}
          onToggleLike={onToggleLike}
          isMobile={isMobile}
        />
      )})}
    </motion.div>
  );
}