"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";

const navItems = [
  { name: "Browse", href: "/browse" },
  { name: "Sell", href: "/sell" },
  { name: "AI Search", href: "/aisearch" },
];

export function MobileMenu({
  isOpen,
  onClose,
  theme,
}: {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{
        opacity: isOpen ? 1 : 0,
        x: isOpen ? "0%" : "100%",
      }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 right-0 h-full w-64 z-40 p-6 ${
        theme === "dark" ? "glass" : "glass-light"
      } md:hidden`}
    >
      <div className="flex flex-col space-y-6 mt-16">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-lg font-medium hover:text-cyan transition-colors"
            onClick={onClose}
          >
            {item.name}
          </a>
        ))}
        <div className="pt-4 border-t border-white/20">
          <Button
            variant="outline"
            className="w-full mb-3 border-cyan/50 text-cyan"
            onClick={() => signIn()}
          >
            Sign In
          </Button>
          <Button
            className="w-full bg-cyan hover:bg-cyan/80 text-black"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
