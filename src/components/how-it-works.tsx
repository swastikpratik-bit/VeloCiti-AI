'use client'

import { motion } from 'framer-motion'
import { Brain, Camera, Search } from 'lucide-react'

const steps = [
  {
    icon: Brain,
    title: 'AI Auto-Fill',
    description: 'Our AI analyzes your car and automatically fills in specs, features, and details with 95% accuracy.'
  },
  {
    icon: Camera,
    title: 'Generate Images',
    description: 'Create stunning, professional car images using our ImageKit.io integration for enhanced listings.'
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find your perfect car using natural language search powered by advanced AI algorithms.'
  }
]

export function HowItWorks() {
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
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to revolutionize your car buying and selling experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-6 lg:-right-12 w-6 lg:w-12 h-0.5 bg-gradient-to-r from-cyan/50 to-transparent" />
              )}

              <div className="glass rounded-2xl p-8 h-full hover:glow-cyan transition-all duration-300 group-hover:scale-105">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-cyan/20 transition-colors">
                    <step.icon className="h-8 w-8 text-cyan" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan rounded-full flex items-center justify-center text-xs font-bold text-black">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-outfit font-semibold mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {step.description}
                </p>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  whileHover={{ scale: 1.02 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}