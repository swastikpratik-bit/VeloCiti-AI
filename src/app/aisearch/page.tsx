'use client'

import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Calendar, Filter, MapPin, Search, Settings, Sparkles, Star, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

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

const searchResults = [
  {
    id: 1,
    name: 'Tesla Model 3 Long Range',
    price: '$52,990',
    image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: 2024,
    mileage: '0 miles',
    location: 'San Francisco, CA',
    matchScore: 98,
    highlights: ['Electric', 'Long Range', 'Autopilot'],
    aiGenerated: true
  },
  {
    id: 2,
    name: 'BMW i4 M50',
    price: '$67,300',
    image: 'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: 2024,
    mileage: '500 miles',
    location: 'Los Angeles, CA',
    matchScore: 95,
    highlights: ['Electric', 'Performance', 'Luxury'],
    aiGenerated: false
  },
  {
    id: 3,
    name: 'Audi e-tron GT',
    price: '$102,400',
    image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: 2024,
    mileage: '1,200 miles',
    location: 'Seattle, WA',
    matchScore: 92,
    highlights: ['Electric', 'Luxury', 'Fast Charging'],
    aiGenerated: true
  }
]

export default function AISearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [currentSuggestion, setCurrentSuggestion] = useState(0)


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
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSearching(false)
    setShowResults(true)
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
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-cyan/20">
                  <Search className="h-6 w-6 text-cyan flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Try: "${searchSuggestions[currentSuggestion]}"`}
                    className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleSearch}
                    disabled={!searchQuery.trim() || isSearching}
                    className="bg-cyan hover:bg-cyan/80 text-black"
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
                    Matching against 50,000+ vehicles...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Ranking results by relevance...
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Search Results */}
      <AnimatePresence>
        {showResults && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="py-20"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-outfit font-semibold mb-4">
                  AI Search Results
                </h2>
                <p className="text-muted-foreground">
                  Found {searchResults.length} cars matching your criteria, ranked by AI relevance
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {searchResults.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl overflow-hidden hover:glow-cyan transition-all duration-300 group cursor-pointer"
                  >
                    <div className="relative">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Match Score */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-cyan/90 text-black font-semibold">
                          <Star className="h-3 w-3 mr-1" />
                          {car.matchScore}% Match
                        </Badge>
                      </div>

                      {/* AI Badge */}
                      {car.aiGenerated && (
                        <Badge className="absolute top-3 right-3 bg-purple-500/90 text-white">
                          <Zap className="h-3 w-3 mr-1" />
                          AI Enhanced
                        </Badge>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-outfit font-semibold mb-2 group-hover:text-cyan transition-colors">
                        {car.name}
                      </h3>
                      <p className="text-2xl font-bold text-cyan mb-4">{car.price}</p>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
                        <div>
                          <Calendar className="inline h-4 w-4 mr-1" />
                          {car.year}
                        </div>
                        <div>
                          <Settings className="inline h-4 w-4 mr-1" />
                          {car.mileage}
                        </div>
                        <div className="col-span-2">
                          <MapPin className="inline h-4 w-4 mr-1" />
                          {car.location}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {car.highlights.map((highlight) => (
                          <Badge key={highlight} variant="outline" className="border-cyan/30 text-cyan text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full bg-cyan hover:bg-cyan/80 text-black font-semibold">
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load More Results */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-12"
              >
                <Button 
                  size="lg"
                  className="bg-cyan hover:bg-cyan/80 text-black font-semibold px-8 py-4 rounded-full magnetic-button"
                >
                  Load More Results
                </Button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* AI Features */}
      <section className="py-20 bg-gradient-to-br from-cyan/5 to-blue/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of car search with cutting-edge artificial intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 hover:glow-cyan transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-outfit font-semibold mb-3 group-hover:text-cyan transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="p-3 rounded-lg bg-background/50 border border-cyan/20">
                      <p className="text-sm text-cyan font-mono">
                        {feature.example}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Tips */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold mb-4">
              Search Like a Pro
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get better results with these AI search tips and techniques
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Be Specific',
                tip: 'Include details like budget, usage, and preferences',
                example: '"Family SUV under $40k with good safety ratings"'
              },
              {
                title: 'Use Natural Language',
                tip: 'Search like you\'re talking to a friend',
                example: '"I need a reliable car for my daily commute"'
              },
              {
                title: 'Mention Priorities',
                tip: 'Tell us what matters most to you',
                example: '"Fuel efficient car, comfort is important"'
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="glass rounded-2xl p-6 hover:glow-cyan transition-all duration-300">
                  <h3 className="text-lg font-outfit font-semibold mb-3 text-cyan">
                    {tip.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {tip.tip}
                  </p>
                  <div className="p-3 rounded-lg bg-background/50 border border-cyan/20">
                    <p className="text-sm text-cyan font-mono">
                      {tip.example}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}