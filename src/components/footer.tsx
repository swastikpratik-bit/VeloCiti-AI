'use client'

import { motion } from 'framer-motion'
import { Car, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react'
import { useTheme } from './theme-provider'

const footerLinks = {
  product: [
    { name: 'Browse Cars', href: '#browse' },
    { name: 'Sell Your Car', href: '#sell' },
    { name: 'AI Search', href: '#search' },
    { name: 'Pricing', href: '#pricing' }
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Press', href: '#press' },
    { name: 'Blog', href: '#blog' }
  ],
  support: [
    { name: 'Help Center', href: '#help' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'API Docs', href: '#api' },
    { name: 'Status', href: '#status' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Cookie Policy', href: '#cookies' },
    { name: 'GDPR', href: '#gdpr' }
  ]
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' }
]

export function Footer() {
  const { theme, toggleTheme } = useTheme()

  return (
    <footer className="relative border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-6">
                {/* <div className="relative">
                  <Car className="h-8 w-8 text-cyan" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan rounded-full animate-pulse"></div>
                </div> */}
                <span className="text-2xl font-outfit font-bold">VeloCiti AI</span>
              </div>
              
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Revolutionizing the automotive marketplace with AI-powered tools for smarter 
                buying, selling, and discovering your perfect car.
              </p>

              {/* Contact info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-cyan" />
                  <span>hello@velociti.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-cyan" />
                  <span>+91 9999999999</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-cyan" />
                  <span>Gorakhpur ,UP</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="p-2 rounded-lg glass hover:glow-cyan transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-cyan transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([section, links], sectionIndex) => (
            <div key={section}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-outfit font-semibold mb-4 capitalize">
                  {section}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <motion.a
                        href={link.href}
                        className="text-muted-foreground hover:text-cyan transition-colors text-sm"
                        whileHover={{ x: 4 }}
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-outfit font-semibold mb-2">
                Stay Updated
              </h3>
              <p className="text-muted-foreground">
                Get the latest AI car marketplace news and features
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
  <input
    type="email"
    placeholder="Enter your email"
    className="px-4 py-2 rounded-lg bg-background/50 border border-white/20 focus:border-cyan focus:outline-none w-full md:w-64"
  />
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-6 py-2 bg-cyan text-black rounded-lg font-semibold hover:bg-cyan/80 transition-colors whitespace-nowrap w-full md:w-auto"
  >
    Subscribe
  </motion.button>
</div>

          </div>
        </motion.div> */}

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10"
        >
          <div className="text-sm text-muted-foreground">
            © 2025 VeloCiti AI. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-sm text-muted-foreground">
              Made with ❤️ for car enthusiasts
            </div>
            
            {/* Theme toggle in footer */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass hover:glow-cyan transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>


  )
}