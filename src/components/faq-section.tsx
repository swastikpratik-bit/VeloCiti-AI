'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'How does the AI auto-fill feature work?',
    answer: 'Our advanced AI analyzes your car photos and existing information to automatically populate details like make, model, year, mileage, features, and specifications. It uses machine learning trained on millions of car listings to achieve 95% accuracy, saving you hours of manual data entry.'
  },
  {
    question: 'Can I trust the AI-generated car images?',
    answer: 'Yes! Our ImageKit.io integration creates professional-quality images that enhance your listing while maintaining authenticity. All AI-generated images are clearly marked, and we encourage combining them with real photos of your vehicle for the best results.'
  },
  {
    question: 'How accurate is the AI search functionality?',
    answer: 'Our AI search understands natural language queries with over 95% accuracy. It can interpret complex requests like "fuel-efficient SUV under $30k with good safety ratings" and find exactly what you\'re looking for by analyzing thousands of vehicle attributes and user preferences.'
  },
  {
    question: 'What fees do you charge for selling cars?',
    answer: 'We believe in transparent pricing. There are no upfront listing fees - you only pay a small success fee when your car sells. This aligns our interests with yours: we succeed when you succeed. Premium features like professional photography are available for an additional fee.'
  },
  {
    question: 'How secure are my personal and financial information?',
    answer: 'Security is our top priority. We use bank-level encryption (256-bit SSL) to protect all data transmission and storage. Your personal information is never shared with third parties without consent, and all payment processing is handled through certified, PCI-compliant systems.'
  },
  {
    question: 'How long does it typically take to sell a car?',
    answer: 'Most cars sell within 7-14 days using our platform. Our AI-powered pricing suggestions, professional listings, and wide network of verified buyers significantly reduce time to sale compared to traditional methods. Premium listings with AI-generated images typically sell 40% faster.'
  },
  {
    question: 'Do you offer any guarantees or support?',
    answer: 'Absolutely! We offer 24/7 customer support and a 30-day satisfaction guarantee. If you\'re not happy with our service within the first 30 days, we\'ll refund any fees paid. Our dedicated support team helps with everything from listing optimization to buyer communication.'
  },
  {
    question: 'Can I use the platform if I\'m not tech-savvy?',
    answer: 'Definitely! Our platform is designed to be intuitive and user-friendly. The AI handles most of the complex work for you, and our step-by-step guided process makes listing a car as simple as answering a few questions. Plus, our support team is always ready to help.'
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about our AI-powered car marketplace
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl overflow-hidden hover:glow-cyan transition-all duration-300"
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <h3 className="text-lg font-outfit font-semibold pr-4 group-hover:text-cyan transition-colors">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {openIndex === index ? (
                      <Minus className="h-5 w-5 text-cyan" />
                    ) : (
                      <Plus className="h-5 w-5 text-muted-foreground" />
                    )}
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-white/10">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-outfit font-semibold mb-3">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-cyan text-black rounded-full font-semibold hover:bg-cyan/80 transition-colors"
                >
                  Contact Support
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-cyan/50 text-cyan rounded-full hover:bg-cyan/10 transition-colors"
                >
                  Schedule a Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}