"use client";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export const EmptyWishlist = () => {
 return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white dark:bg-[#0a0a0a] transition-colors duration-500 rounded-[3rem] border border-gray-50 dark:border-gray-900 overflow-hidden relative">
      
      {/* دوائر ضوئية في الخلفية لإعطاء عمق في الدارك مود */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/5 dark:bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="w-48 h-48 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-10 relative group"
      >
        {/* أيقونة قلب نابضة خلف الشنطة */}
        <div className="absolute inset-0 flex items-center justify-center">
            <Heart size={120} className="text-red-500/5 dark:text-red-500/10 animate-pulse" />
        </div>
        
        <ShoppingBag size={80} className="text-gray-300 dark:text-gray-700 group-hover:text-green-500 transition-colors duration-500" />
        
        {/* الدائرة المنقطة بتأثير دوران أنعم */}
        <div className="absolute inset-[-10px] rounded-full border-2 border-dashed border-gray-100 dark:border-gray-800 animate-[spin_10s_linear_infinite]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <h2 className="text-4xl font-black text-[#0f172a] dark:text-white mb-4 tracking-tighter">
          Your Wishlist is <span className="text-green-600">Empty</span>
        </h2>

        <p className="text-gray-400 dark:text-gray-500 max-w-sm mx-auto leading-relaxed mb-12 font-medium">
          Looks like you haven't saved any treasures yet. Start exploring our collection and <span className="text-gray-800 dark:text-gray-300 font-bold">save your favorites</span>!
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-green-500/20 dark:shadow-none transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          Start Exploring
          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </motion.div>

    </div>
  );
};
