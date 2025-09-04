'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { useTheme } from './theme-provider'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const { theme } = useTheme()
  const router = useRouter()

  // Create particles
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${Math.random() * 3 + 8}s`
      }}
    />
  ))

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0 z-0">
        {particles}
      </div>

      {/* Background gradient */}
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20' 
          : 'bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-cyan-100/40'
      }`} />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
       

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-outfit font-bold mb-6 leading-tight mt-20"
        >
          Create & Trade Cars with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue-400">
            AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Experience the future of automotive commerce. Our AI auto-fills car details, 
          generates stunning visuals, and helps you find the perfect vehicle with intelligent search.
        </motion.p>

        {/* Hero Car Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative mb-12"
        >
          <div className="relative mx-auto w-full max-w-4xl">
            <div className="aspect-video rounded-2xl overflow-hidden glass glow-cyan">
              <img
                src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="AI-Generated Luxury Car"
                className="w-full h-full object-cover animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1 rounded-full bg-cyan/90 text-black text-sm font-medium">
                  AI Generated
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-cyan hover:bg-cyan/80 text-black font-semibold px-8 py-4 rounded-full magnetic-button group"
            onClick={() => router.push('/sell')}
          >
            Create Your AI Car
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-cyan/50 text-cyan hover:bg-cyan/10 px-8 py-4 rounded-full magnetic-button"
            onClick={() => router.push('/browse')}
          >
            Browse Marketplace
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          {[
            { number: '10K+', label: 'AI Cars Created' },
            { number: '500+', label: 'Happy Sellers' },
            { number: '95%', label: 'Accuracy Rate' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-outfit font-bold text-cyan mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}