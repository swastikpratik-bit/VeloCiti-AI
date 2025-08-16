'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/src/components/ui/button'

const exampleQueries = [
  'Find me a red sports car under $50k',
  'Electric SUV with good range',
  'Fuel efficient sedan for city driving',
  'Luxury convertible for weekend trips',
  'Hybrid car with low mileage'
]

const searchSuggestions = [
  { query: 'Tesla Model 3', type: 'Popular' },
  { query: 'BMW X5 hybrid', type: 'Trending' },
  { query: 'Porsche 911 convertible', type: 'Luxury' },
  { query: 'Toyota Prius fuel efficient', type: 'Economic' }
]

export function AISearchDemo() {
  const [currentQuery, setCurrentQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [typingIndex, setTypingIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const currentExample = exampleQueries[typingIndex]
      
      if (charIndex < currentExample.length) {
        setCurrentQuery(currentExample.slice(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      } else {
        setTimeout(() => {
          setCharIndex(0)
          setTypingIndex(prev => (prev + 1) % exampleQueries.length)
          setCurrentQuery('')
        }, 2000)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [typingIndex, charIndex])

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold mb-4">
            AI-Powered Search
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your perfect car using natural language. Our AI understands what you're looking for.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Search Demo */}
          <div className="relative mb-12">
            <div className="glass rounded-2xl p-8 glow-cyan">
              <div className="relative">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-cyan/20">
                  <Search className="h-6 w-6 text-cyan" />
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={currentQuery}
                      readOnly
                      placeholder="Try typing: 'Find me a red sports car under $50k'"
                      className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
                    />
                    <div className="absolute right-0 top-0 h-full w-0.5 bg-cyan animate-pulse" />
                  </div>
                  <Button size="sm" className="bg-cyan hover:bg-cyan/80 text-black">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>

                {/* Live suggestions */}
                {/* <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: currentQuery.length > 10 ? 1 : 0,
                    y: currentQuery.length > 10 ? 0 : -10
                  }}
                  className="absolute top-full left-0 right-0 mt-2 glass rounded-xl p-4 z-10"
                >
                  <div className="text-sm text-muted-foreground mb-3">AI Suggestions:</div>
                  <div className="space-y-2">
                    {searchSuggestions.map((suggestion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-cyan/10 cursor-pointer group z-40"
                      >
                        <div className="flex items-center gap-3">
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <span className="group-hover:text-cyan transition-colors">
                            {suggestion.query}
                          </span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-cyan/20 text-cyan">
                          {suggestion.type}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div> */}
              </div>
            </div>
          </div>

          {/* Example queries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {exampleQueries.map((query, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-lg p-4 text-left hover:glow-cyan transition-all duration-300 group"
                onClick={() => setCurrentQuery(query)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Search className="h-4 w-4 text-cyan" />
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan transition-colors" />
                </div>
                <p className="text-sm group-hover:text-cyan transition-colors">
                  "{query}"
                </p>
              </motion.button>
            ))}
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: 'Natural Language',
                description: 'Search using everyday language, just like talking to a friend'
              },
              {
                title: 'Smart Filters',
                description: 'AI automatically applies relevant filters based on your query'
              },
              {
                title: 'Instant Results',
                description: 'Get personalized recommendations in milliseconds'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-outfit font-semibold mb-2 text-cyan">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}