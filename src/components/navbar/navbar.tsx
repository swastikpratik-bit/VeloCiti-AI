// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Car, Menu, X, Moon, Sun } from "lucide-react";
// import { useTheme } from "./theme-provider";
// import { Button } from "@/src/components/ui/button";
// import { signIn } from "next-auth/react";
// import { auth, signOut } from "../auth";

// export function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { theme, toggleTheme } = useTheme();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navItems = [
//     { name: "Browse", href: "/browse" },
//     { name: "Sell", href: "/sell" },
//     { name: "AI Search", href: "/aisearch" },
//   ];

//   return (
//     <>
//       <motion.nav
//         initial={{ opacity: 0, y: -100 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isScrolled
//             ? theme === "dark"
//               ? "glass border-b border-white/10"
//               : "glass-light border-b border-black/10"
//             : ""
//         }`}
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <motion.div
//               className="flex items-center space-x-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="relative">
//                 {/* <Car className="h-8 w-8 text-cyan" /> */}
//                 {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan rounded-full animate-pulse"></div> */}
//               </div>
//               <a href="/" className="text-xl font-outfit font-bold">
//                 VeloCiti AI
//               </a>
//             </motion.div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               {navItems.map((item) => (
//                 <motion.a
//                   key={item.name}
//                   href={item.href}
//                   className="relative text-sm font-medium hover:text-cyan transition-colors duration-200"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {item.name}
//                   <motion.div
//                     className="absolute -bottom-1 left-0 h-0.5 bg-cyan"
//                     initial={{ width: 0 }}
//                     whileHover={{ width: "100%" }}
//                     transition={{ duration: 0.2 }}
//                   />
//                 </motion.a>
//               ))}
//             </div>

//             <div className="flex items-center space-x-4">
//               <Button
//                 onClick={() => signIn()}
//                 size="sm"
//                 className="hidden sm:flex bg-cyan hover:bg-cyan/80 text-black magnetic-button"
//               >
//                 Sign In
//               </Button>

//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
//               >
//                 {isMobileMenuOpen ? <X /> : <Menu />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Floating Theme Toggle */}
//       <motion.button
//         onClick={toggleTheme}
//         className={`fixed top-20 right-4 z-50 p-3 rounded-full transition-all duration-300 ${
//           theme === "dark" ? "glass" : "glass-light"
//         } hover:scale-110`}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         initial={{ opacity: 0, x: 100 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 1, duration: 0.6 }}
//       >
//         {theme === "dark" ? (
//           <Sun className="h-5 w-5 text-cyan" />
//         ) : (
//           <Moon className="h-5 w-5 text-cyan" />
//         )}
//       </motion.button>

//       {/* Mobile Menu */}
//       <motion.div
//         initial={{ opacity: 0, x: "100%" }}
//         animate={{
//           opacity: isMobileMenuOpen ? 1 : 0,
//           x: isMobileMenuOpen ? "0%" : "100%",
//         }}
//         transition={{ duration: 0.3 }}
//         className={`fixed top-0 right-0 h-full w-64 z-40 p-6 ${
//           theme === "dark" ? "glass" : "glass-light"
//         } md:hidden`}
//       >
//         <div className="flex flex-col space-y-6 mt-16">
//           {navItems.map((item) => (
//             <a
//               key={item.name}
//               href={item.href}
//               className="text-lg font-medium hover:text-cyan transition-colors"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               {item.name}
//             </a>
//           ))}
//           <div className="pt-4 border-t border-white/20">
//             <Button
//               variant="outline"
//               className="w-full mb-3 border-cyan/50 text-cyan"
//             >
//               Sign In
//             </Button>
//             <Button className="w-full bg-cyan hover:bg-cyan/80 text-black">
//               Get Started
//             </Button>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// }

// src/components/navbar.tsx
import { auth } from "../../auth";
import { NavClient } from "./navbar-client";

export async function Navbar() {
  // Any server-side props or session logic can go here
  // Example: you could fetch session using `auth()` in server component

  const session = await auth();
  console.log(session);

  return (
    <>
      <NavClient />
    </>
  );
}
