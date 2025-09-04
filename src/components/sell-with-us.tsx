'use client'

import { motion } from 'framer-motion'
import { Zap, Camera, TrendingUp, Shield, Clock, Users } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { useRouter } from 'next/navigation'

const benefits = [
  {
    icon: Zap,
    title: 'AI Auto-Fill',
    description: 'Our AI automatically fills car details, saving you hours of manual work',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Camera,
    title: 'Professional Images',
    description: 'Generate stunning car photos with ImageKit.io integration',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: TrendingUp,
    title: 'Smart Pricing',
    description: 'AI-powered market analysis ensures competitive pricing',
    color: 'from-green-400 to-blue-500'
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Bank-level security for all payments and personal data',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    icon: Clock,
    title: 'Quick Listings',
    description: 'List your car in under 5 minutes with our streamlined process',
    color: 'from-red-400 to-pink-500'
  },
  {
    icon: Users,
    title: 'Wide Reach',
    description: 'Access to thousands of verified buyers actively searching',
    color: 'from-indigo-400 to-purple-500'
  }
]

export function SellWithUs() {
  const router = useRouter()
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
            Sell With Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of car selling with AI-powered tools and unmatched support
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass rounded-2xl p-6 h-full hover:glow-cyan transition-all duration-300 group-hover:scale-105">
                <div className="relative mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
                </div>

                <h3 className="text-xl font-outfit font-semibold mb-3 group-hover:text-cyan transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '98%', label: 'Success Rate', suffix: '' },
              { number: '7', label: 'Days Average', suffix: ' to sell' },
              { number: '$2.5K', label: 'Higher Prices', suffix: ' on average' },
              { number: '24/7', label: 'Support', suffix: ' available' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-outfit font-bold text-cyan mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}{stat.suffix}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-cyan hover:bg-cyan/80 text-black font-semibold px-8 py-4 rounded-full magnetic-button"
              onClick={() => router.push('/sell')}
            >
              Start Selling Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-cyan/50 text-cyan hover:bg-cyan/10 px-8 py-4 rounded-full magnetic-button"
              onClick={() => router.push('/sell')}
            >
              Learn More
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No listing fees • Free until sold • 30-day guarantee
          </p>
        </motion.div>
      </div>
    </section>
  )
}