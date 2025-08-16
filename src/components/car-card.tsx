"use client"

import { motion } from "framer-motion"

interface CarCardProps {
  image: string
  name: string
  price: string
  year: number
  mileage: string
  fuel: string
}

export function CarCard({ image, name, price, year, mileage, fuel }: CarCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl cursor-pointer"
    >
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <span className="absolute top-3 left-3 bg-cyan-500 text-white text-sm px-3 py-1 rounded-full">
          {year}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-cyan-500 font-bold text-xl">{price}</p>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-3">
          <span>{mileage}</span>
          <span>{fuel}</span>
        </div>
      </div>
    </motion.div>
  )
}
