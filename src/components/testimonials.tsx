'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/src/components/ui/button'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Tesla Model 3 Buyer',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'The AI search feature is incredible! I just typed "eco-friendly car with good tech" and found my perfect Tesla in minutes. The whole process was seamless.',
    location: 'San Francisco, CA'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'BMW X5 Seller',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'Sold my BMW in just 5 days! The AI auto-fill saved me so much time, and the generated images looked professional. Got 15% more than I expected.',
    location: 'Austin, TX'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Porsche 911 Buyer',
    avatar: 'https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'As a car enthusiast, I was skeptical about AI-powered car shopping. But this platform understood exactly what I was looking for. Found my dream Porsche!',
    location: 'Miami, FL'
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Honda Accord Seller',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'The smart pricing feature helped me price my Honda competitively. The AI insights were spot-on, and I received multiple offers within 48 hours.',
    location: 'Seattle, WA'
  },
  {
    id: 5,
    name: 'Lisa Park',
    role: 'Audi Q7 Buyer',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'The natural language search is a game-changer. I found exactly what I needed for my family - a luxury SUV with safety features and good fuel economy.',
    location: 'Denver, CO'
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

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
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied buyers and sellers who've transformed their car experience with AI
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="relative h-96 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="glass rounded-2xl p-8 h-full flex flex-col justify-center relative overflow-hidden">
                  {/* Background quote */}
                  <Quote className="absolute top-4 right-4 h-16 w-16 text-cyan/10" />
                  
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative mb-6"
                    >
                      <img
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-cyan/50"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-cyan rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-black fill-current" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex mb-4"
                    >
                      {Array.from({ length: testimonials[currentIndex].rating }, (_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg leading-relaxed mb-6 max-w-2xl"
                    >
                      "{testimonials[currentIndex].text}"
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4 className="font-outfit font-semibold text-lg text-cyan">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-muted-foreground">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-sm text-muted-foreground/70">
                        {testimonials[currentIndex].location}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-cyan/50 text-cyan hover:bg-cyan/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-cyan w-8' 
                      : 'bg-muted-foreground/30 hover:bg-cyan/50'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-cyan/50 text-cyan hover:bg-cyan/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Thumbnail previews */}
          <div className="grid grid-cols-5 gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => goToTestimonial(index)}
                className={`relative group ${
                  index === currentIndex ? 'scale-105' : 'opacity-60 hover:opacity-100'
                }`}
                whileHover={{ scale: index === currentIndex ? 1.05 : 1.02 }}
              >
                <div className={`glass rounded-lg p-3 transition-all duration-300 ${
                  index === currentIndex ? 'glow-cyan' : ''
                }`}>
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mx-auto object-cover"
                  />
                  <p className="text-xs mt-2 truncate font-medium">
                    {testimonial.name.split(' ')[0]}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}