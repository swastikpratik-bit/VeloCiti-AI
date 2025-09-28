"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { Eye, Heart, Zap } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import type { Car } from "@/src/constants/browse-cars";

interface CarCardProps {
  car: Car;
  index: number;
  viewMode: "grid" | "list";
  isLiked: boolean;
  onToggleLike: (carId: string) => void;
  isMobile: boolean;
}

export const CarCard = memo(function CarCard({
  car,
  index,
  viewMode,
  isLiked,
  onToggleLike,
  isMobile,
}: CarCardProps) {
  const effectiveViewMode = isMobile ? "grid" : viewMode;

  return (
    <Link href={`/browse/${car.id}`}>
      <motion.div
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
            effectiveViewMode === "list" && !isMobile ? "flex w-full" : ""
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
                src={car.images[0]}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {car.isFeatured && (
              <Badge className="absolute top-3 left-3 bg-cyan/90 text-black">
                <Zap className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}

            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleLike(car.id);
                }}
                className={`p-2 rounded-full glass ${
                  isLiked ? "text-red-500" : "text-white"
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
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
              <p className="text-2xl font-bold text-cyan mb-4">₹{car.price.toLocaleString()}</p>

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
                  <span className="font-medium">Fuel:</span> {car.fuelType.toLowerCase()}
                </div>
                <div>
                  <span className="font-medium">Mileage:</span> {car.mileage} miles
                </div>
                <div>
                  <span className="font-medium">Location:</span> {car.location}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="border-cyan/30 text-cyan">
                  {car.type.toLowerCase()}
                </Badge>
                <Badge variant="outline" className="border-cyan/30 text-cyan">
                  {car.brand}
                </Badge>
                {car.isNew && (
                  <Badge variant="outline" className="border-green-500/30 text-green-500">
                    New
                  </Badge>
                )}
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
  );
});