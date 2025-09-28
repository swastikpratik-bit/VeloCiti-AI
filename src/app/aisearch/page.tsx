'use client'

import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { findCar } from '@/src/lib/actions/ai-action'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Calendar, Filter, MapPin, Search, Settings, Sparkles, Star, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getCarById } from '@/src/lib/actions/cars-actions'
import { convertStringToArray } from '@/src/lib/utils'

const searchSuggestions = [
  'Find me a red sports car under $50k with low mileage',
  'Electric SUV with good range for family trips',
  'Fuel efficient sedan for daily commuting',
  'Luxury convertible for weekend drives',
  'Hybrid car with advanced safety features',
  'Compact car perfect for city parking',
  'Truck with towing capacity over 8000 lbs',
  'Vintage muscle car in excellent condition'
]

const aiFeatures = [
  {
    icon: Search,
    title: 'Natural Language Search',
    description: 'Search using everyday language, just like talking to a friend',
    example: '"Find me a reliable family car under $30k"'
  },

  {
    icon: Sparkles,
    title: 'Smart Recommendations',
    description: 'AI learns your preferences and suggests perfect matches',
    example: 'Personalized suggestions based on your history'
  },
  {
    icon: Filter,
    title: 'Intelligent Filtering',
    description: 'AI automatically applies relevant filters from your query',
    example: '"Eco-friendly" → Electric + Hybrid filters'
  }
]



export default function AISearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [currentSuggestion, setCurrentSuggestion] = useState(0)
  const [cars, setCars] = useState<Awaited<ReturnType<typeof getCarById>>[]>([]);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion(prev => (prev + 1) % searchSuggestions.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setShowResults(false)

    try {
      const aiResponse = await findCar(searchQuery)
      const carIds = convertStringToArray(aiResponse)

      const carDetails = await Promise.all(carIds.map(async (carId) => {
        const car = await getCarById(carId)
        return car
      }))

      setCars(carDetails.filter(Boolean))

      await new Promise(resolve => setTimeout(resolve, 1000))

      setIsSearching(false)
      setShowResults(true)
    } catch (error) {
      console.error('Search error:', error)
      setIsSearching(false)
    }
  }



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
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold mb-4">
              AI-Powered <span className="text-cyan">Car Search</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Find your perfect car using natural language, voice commands, or visual search powered by advanced AI
            </p>
          </motion.div>

          {/* Main Search Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="glass rounded-2xl p-8 glow-cyan">
              <div className="relative mb-6">
                <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-background/50 border border-cyan/20">
                  <Search className="h-5 w-5 sm:h-6 sm:w-6 text-cyan flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Try: "${searchSuggestions[currentSuggestion]}"`}
                    className="flex-1 min-w-0 bg-transparent text-base sm:text-lg outline-none placeholder:text-muted-foreground"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button
                    size="sm"
                    onClick={handleSearch}
                    disabled={!searchQuery.trim() || isSearching}
                    className="flex-shrink-0 bg-cyan hover:bg-cyan/80 text-black px-3 sm:px-4"
                  >
                    {isSearching ? (
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Quick Search Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchSuggestions.slice(0, 4).map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSearchQuery(suggestion)}
                    className="text-left p-3 rounded-lg bg-white/5 hover:bg-cyan/10 border border-white/10 hover:border-cyan/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm group-hover:text-cyan transition-colors">
                        "{suggestion}"
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Processing Animation */}
      <AnimatePresence>
        {isSearching && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-20 overflow-hidden"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="max-w-md mx-auto"
              >
                <div className="relative mb-8">
                  <div className="w-32 h-32 rounded-full border-4 border-cyan/20 border-t-cyan animate-spin mx-auto"></div>
                  <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-cyan animate-pulse" />
                </div>
                <h3 className="text-2xl font-outfit font-semibold mb-4">AI is Searching...</h3>
                <div className="space-y-2 text-muted-foreground">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Analyzing your search query...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    Finding matching vehicles...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Calculating compatibility scores...
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Search Results */}
      <AnimatePresence>
        {showResults && cars.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="py-20"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-outfit font-bold mb-4">
                  Found <span className="text-cyan">{cars.length}</span> Perfect Matches
                </h2>
                <p className="text-muted-foreground">
                  AI-powered search results tailored to your query
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cars.map((car, index) => (
                  <motion.div
                    key={car?.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl overflow-hidden hover:glow-cyan transition-all duration-300 group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={car?.images?.[0] || '/placeholder-car.jpg'}
                        alt={car?.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {car?.isFeatured && (
                        <Badge className="absolute top-3 left-3 bg-cyan/90 text-black">
                          <Zap className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <div className="absolute top-3 right-3">
                        <div className="bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          AI Match
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-outfit font-semibold group-hover:text-cyan transition-colors">
                            {car?.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{car?.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-cyan">
                            ₹{car?.price?.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{car?.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Settings className="h-4 w-4" />
                          <span>{car?.mileage?.toLocaleString()} miles</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{car?.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4" />
                          <span>{car?.fuelType}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="border-cyan/30 text-cyan">
                          {car?.type}
                        </Badge>
                        <Badge variant="outline" className="border-cyan/30 text-cyan">
                          {car?.transmission}
                        </Badge>
                        {car?.isNew && (
                          <Badge variant="outline" className="border-green-500/30 text-green-500">
                            New
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {car?.description}
                      </p>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-cyan hover:bg-cyan/80 text-black"
                          onClick={() => window.location.href = `/browse/${car?.id}`}
                        >
                          View Details
                        </Button>
                        <Button variant="outline" className="border-cyan/50 text-cyan">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {showResults && cars.length === 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-20 text-center"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl font-outfit font-semibold mb-4">
                No matches found
              </h3>
              <p className="text-muted-foreground mb-8">
                Try adjusting your search query or browse our available cars
              </p>
              <Button
                onClick={() => setShowResults(false)}
                className="bg-cyan hover:bg-cyan/80 text-black"
              >
                Try Another Search
              </Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* AI Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold mb-4">
              Powered by <span className="text-cyan">Advanced AI</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of car shopping with our intelligent search technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 text-center hover:glow-cyan transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-cyan/20 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-cyan" />
                </div>
                <h3 className="text-xl font-outfit font-semibold mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <div className="text-sm text-cyan bg-cyan/10 rounded-lg p-3">
                  {feature.example}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}