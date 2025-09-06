"use client";

import { motion } from "framer-motion";

export function BrowseHero() {
  return (
    <section className="pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold mb-4">
            Browse <span className="text-cyan">AI Cars</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of AI-enhanced vehicles with intelligent search
            and filtering
          </p>
        </motion.div>
      </div>
    </section>
  );
}