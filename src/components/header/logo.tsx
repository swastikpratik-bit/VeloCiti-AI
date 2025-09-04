"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Logo() {
  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
    >
      <Link href="/" className="text-xl font-outfit font-bold">
        VeloCiti AI
      </Link>
    </motion.div>
  );
}
