"use client";

import { motion } from "framer-motion";

export function Logo() {
  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
    >
      <a href="/" className="text-xl font-outfit font-bold">
        VeloCiti AI
      </a>
    </motion.div>
  );
}
