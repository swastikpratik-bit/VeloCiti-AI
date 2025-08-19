"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed top-20 right-4 z-50 p-3 rounded-full transition-all duration-300 ${
        theme === "dark" ? "glass" : "glass-light"
      } hover:scale-110`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-cyan" />
      ) : (
        <Moon className="h-5 w-5 text-cyan" />
      )}
    </motion.button>
  );
}
