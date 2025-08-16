'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Eye, Zap, X } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { Badge } from '@/src/components/ui/badge'

const featuredCars = [
  {
    id: 1,
    name: 'Tesla Model S Plaid',
    price: '$129,990',
    image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2024,
    mileage: '0 miles',
    fuel: 'Electric',
    transmission: 'Auto',
    aiGenerated: true,
    description: 'Ultra-high performance electric sedan with tri-motor setup and advanced autopilot features.',
    specs: {
      'Max Speed': '200 mph',
      'Acceleration': '0-60 in 1.99s',
      'Range': '396 miles',
      'Battery': '100 kWh'
    }
  },
  {
    id: 2,
    name: 'BMW i8 Roadster',
    price: '$148,495',
    image: 'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2023,
    mileage: '1,200 miles',
    fuel: 'Hybrid',
    transmission: 'Auto',
    aiGenerated: false,
    description: 'Futuristic hybrid sports car with stunning design and cutting-edge technology.',
    specs: {
      'Max Speed': '155 mph',
      'Acceleration': '0-60 in 4.2s',
      'MPG': '69 combined',
      'Engine': '1.5L 3-cyl + Electric'
    }
  },
  {
    id: 3,
    name: 'Porsche Taycan Turbo S',
    price: '$185,000',
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2024,
    mileage: '500 miles',
    fuel: 'Electric',
    transmission: 'Auto',
    aiGenerated: true,
    description: 'Pure electric performance with iconic Porsche DNA and exceptional build quality.',
    specs: {
      'Max Speed': '162 mph',
      'Acceleration': '0-60 in 2.6s',
      'Range': '227 miles',
      'Power': '750 hp'
    }
  },
  {
    id: 4,
    name: 'Lamborghini Huracán',
    price: '$208,571',
    image: 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2023,
    mileage: '800 miles',
    fuel: 'Gasoline',
    transmission: 'Auto',
    aiGenerated: false,
    description: 'Italian supercar excellence with naturally aspirated V10 engine and all-wheel drive.',
    specs: {
      'Max Speed': '202 mph',
      'Acceleration': '0-60 in 2.9s',
      'Engine': '5.2L V10',
      'Power': '630 hp'
    }
  }
]

export function FeaturedCars() {
  const [selectedCar, setSelectedCar] = useState<typeof featuredCars[0] | null>(null)
  const [likedCars, setLikedCars] = useState<number[]>([])

  const toggleLike = (carId: number) => {
    setLikedCars(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    )
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold mb-4">
            Featured Cars
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles, enhanced with AI-powered insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {featuredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedCar(car)}
            >
              <div className="glass rounded-2xl overflow-hidden hover:glow-cyan transition-all duration-300 group-hover:scale-105">
                <div className="relative">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
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
                        e.stopPropagation()
                        toggleLike(car.id)
                      }}
                      className={`p-2 rounded-full glass ${
                        likedCars.includes(car.id) ? 'text-red-500' : 'text-white'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${likedCars.includes(car.id) ? 'fill-current' : ''}`} />
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

                <div className="p-6">
                  <h3 className="text-xl font-outfit font-semibold mb-2 group-hover:text-cyan transition-colors">
                    {car.name}
                  </h3>
                  <p className="text-2xl font-bold text-cyan mb-4">{car.price}</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Year:</span> {car.year}
                    </div>
                    <div>
                      <span className="font-medium">Fuel:</span> {car.fuel}
                    </div>
                    <div>
                      <span className="font-medium">Mileage:</span> {car.mileage}
                    </div>
                    <div>
                      <span className="font-medium">Trans:</span> {car.transmission}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedCar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedCar(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedCar(null)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full glass hover:bg-white/20 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  
                  <div className="aspect-video overflow-hidden rounded-t-2xl">
                    <img
                      src={selectedCar.image}
                      alt={selectedCar.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-outfit font-bold mb-2">
                        {selectedCar.name}
                      </h3>
                      <p className="text-3xl font-bold text-cyan">
                        {selectedCar.price}
                      </p>
                    </div>
                    {selectedCar.aiGenerated && (
                      <Badge className="bg-cyan/90 text-black">
                        <Zap className="h-4 w-4 mr-1" />
                        AI Enhanced
                      </Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                    {selectedCar.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {Object.entries(selectedCar.specs).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">{key}</div>
                        <div className="text-lg font-semibold">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1 bg-cyan hover:bg-cyan/80 text-black font-semibold">
                      Contact Seller
                    </Button>
                    <Button variant="outline" className="flex-1 border-cyan/50 text-cyan">
                      Schedule Test Drive
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}