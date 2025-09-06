"use client";

import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";

export function LoadMoreButton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="text-center mt-12"
    >
      <Button
        size="lg"
        className="bg-cyan hover:bg-cyan/80 text-black font-semibold px-8 py-4 rounded-full magnetic-button"
      >
        Load More Cars
      </Button>
    </motion.div>
  );
}