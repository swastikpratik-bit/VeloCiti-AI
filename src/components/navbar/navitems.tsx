"use client";

import { motion } from "framer-motion";

const navItems = [
  { name: "Browse", href: "/browse" },
  { name: "Sell", href: "/sell" },
  { name: "AI Search", href: "/aisearch" },
];

export function NavItems() {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <motion.a
          key={item.name}
          href={item.href}
          className="relative text-sm font-medium hover:text-cyan transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.name}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-cyan"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.2 }}
          />
        </motion.a>
      ))}
    </div>
  );
}
