"use client";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-40 h-40 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-8 relative transition-colors"
      >
        <ShoppingBag size={80} className="text-gray-200 dark:text-gray-800" />
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-100 dark:border-gray-800 animate-spin-slow" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-black text-gray-800 dark:text-white mb-4"
      >
        Your cart is empty
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed mb-10"
      >
        Looks like you haven't added anything to your cart yet. Start exploring
        our products!
      </motion.p>

      <Link 
        href={'/'} 
        className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-green-100 dark:shadow-none hover:bg-green-700 transition-all"
      >
        Start Shopping <ArrowRight size={20} />
      </Link>
    </div>
  );
};
