"use client";

import { Badge } from "@/src/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Calendar, Clock, Eye, Gauge, MapPin, Star, PenTool as Tool } from "lucide-react";

interface CarHeaderProps {
  name: string;
  location: string;
  viewCount: number;
  rating: number;
  reviews: number;
  price: number;
  year: number;
  mileage: number;
  transmission: string;
  fuelType: string;
  features: string[];
}

export function CarHeader({
  name,
  location,
  viewCount,
  rating,
  reviews,
  price,
  year,
  mileage,
  transmission,
  fuelType,
  features,
}: CarHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        {/* Left side: Name + details */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-outfit font-bold mb-2">
            {name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-muted-foreground mb-3 sm:mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{viewCount} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>
                {rating} ({reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Price */}
        <div className="text-left sm:text-right">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan mb-1">
            ₹{price.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Market price</p>
        </div>
      </div>


      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
          <Calendar className="h-4 w-4 text-cyan" />
          <div>
            <p className="text-sm text-muted-foreground">Year</p>
            <p className="font-semibold">{year}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
          <Gauge className="h-4 w-4 text-cyan" />
          <div>
            <p className="text-sm text-muted-foreground">Mileage</p>
            <p className="font-semibold">{mileage} miles</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
          <Clock className="h-4 w-4 text-cyan" />
          <div>
            <p className="text-sm text-muted-foreground">
              Transmission
            </p>
            <p className="font-semibold">{transmission}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
          <Tool className="h-4 w-4 text-cyan" />
          <div>
            <p className="text-sm text-muted-foreground">Fuel</p>
            <p className="font-semibold">{fuelType}</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Key Features</h3>
        <ScrollArea>
          <div className="flex gap-2 pb-4">
            {features.map((feature) => (
              <Badge
                key={feature}
                variant="outline"
                className="border-cyan/30 text-cyan flex-shrink-0"
              >
                {feature}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </motion.div>
  );
}