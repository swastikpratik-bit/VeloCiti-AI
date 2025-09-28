"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { motion } from "framer-motion";
import { Shield, Zap, Gauge } from "lucide-react";
import { FaDoorOpen, FaWrench } from "react-icons/fa";
import { PiEngineFill, PiSeatFill } from "react-icons/pi";

interface CarDetailsTabsProps {
  description: string;
  specifications: {
    acceleration: number;
    topSpeed: number;
    horsepower: number;
    range: number;
    length: number;
    width: number;
    height: number;
    weight: number;
    torque: number;
    seats: number;
    doors: number;
  };
  colors: string[];
}

export function CarDetailsTabs({ description, specifications, colors }: CarDetailsTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="glass border border-cyan/20 w-full">
          <TabsTrigger
            value="details"
            className="flex-1 data-[state=active]:bg-cyan data-[state=active]:text-black"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="specs"
            className="flex-1 data-[state=active]:bg-cyan data-[state=active]:text-black"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="flex-1 data-[state=active]:bg-cyan data-[state=active]:text-black"
          >
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card className="glass border-cyan/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-cyan">
                    Performance
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>0-60 mph:</span>
                      <span className="font-medium">
                        {specifications.acceleration}s
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Top Speed:</span>
                      <span className="font-medium">
                        {specifications.topSpeed} mph
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Horsepower:</span>
                      <span className="font-medium">
                        {specifications.horsepower} hp
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Range:</span>
                      <span className="font-medium">
                        {specifications.range} miles
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-cyan">
                    Dimensions
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Length:</span>
                      <span className="font-medium">
                        {specifications.length} mm
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Width:</span>
                      <span className="font-medium">
                        {specifications.width} mm
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Height:</span>
                      <span className="font-medium">
                        {specifications.height} mm
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Weight:</span>
                      <span className="font-medium">
                        {specifications.weight} kg
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specs" className="mt-6">
          <Card className="glass border-cyan/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">
                Technical Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 text-cyan flex items-center gap-2">
                    <PiEngineFill className="h-5 w-5" />
                    Engine & Performance
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <FaWrench className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Torque: {specifications.torque} Nm
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Horsepower: {specifications.horsepower} hp
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-cyan flex items-center gap-2">
                    <PiSeatFill className="h-5 w-5" />
                    Interior & Comfort
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <PiSeatFill className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Seats: {specifications.seats}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaDoorOpen className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Doors: {specifications.doors}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4 text-cyan">Available Colors</h4>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-cyan/50 scrollbar-track-white/5">
                  {colors.map((color) => (
                    <div key={color} className="flex-shrink-0 text-center">
                      <div
                        className="w-12 h-12 rounded-full border-2 border-white/20 mb-2"
                        style={{
                          backgroundColor: color.toLowerCase().replace(" ", ""),
                        }}
                      />
                      <p className="text-xs text-muted-foreground">{color}</p>
                    </div>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="glass border-cyan/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Vehicle History
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Shield className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-green-500">
                      Clean History
                    </p>
                    <p className="text-sm text-muted-foreground">
                      No accidents or damage reported
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-cyan/10 border border-cyan/20">
                  <Zap className="h-5 w-5 text-cyan" />
                  <div>
                    <p className="font-medium text-cyan">
                      AI Verified
                    </p>
                    <p className="text-sm text-muted-foreground">
                      All details verified by AI systems
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}