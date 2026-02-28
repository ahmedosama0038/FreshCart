"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // أو استخدم أيقونة Font Awesome

const BannersSection = () => {
 return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 overflow-hidden transition-colors duration-500">
      
      {/* Banner 1 - Coming from Left */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#15803d] to-[#22c55e] dark:from-[#064e3b] dark:to-[#15803d] p-8 md:p-12 text-white group cursor-pointer transition-all duration-500"
      >
        <div className="relative z-10 flex flex-col h-full justify-between max-w-[60%]">
          <div>
            <span className="inline-block bg-white/20 dark:bg-black/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold mb-4 border border-white/10">
              🔥 Deal of the Day
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
              Fresh Organic Fruits
            </h2>
            <p className="text-white/80 dark:text-green-100/70 text-sm mb-6">
              Get up to 40% off on selected organic fruits
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">40% OFF</span>
              <span className="text-xs text-white/70">Use code: <b className="text-white">ORGANIC40</b></span>
            </div>
            <button className="bg-white dark:bg-green-500 dark:text-white text-[#15803d] px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-green-400 transition-colors w-fit shadow-lg dark:shadow-none">
              Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* الخلفية الزخرفية */}
        <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-64 h-64 bg-white/10 dark:bg-green-400/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
      </motion.div>

      {/* Banner 2 - Coming from Right */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f97316] to-[#ef4444] dark:from-[#7c2d12] dark:to-[#991b1b] p-8 md:p-12 text-white group cursor-pointer transition-all duration-500"
      >
        <div className="relative z-10 flex flex-col h-full justify-between max-w-[60%]">
          <div>
            <span className="inline-block bg-black/10 dark:bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold mb-4 border border-white/5">
              ✨ New Arrivals
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
              Exotic Vegetables
            </h2>
            <p className="text-white/80 dark:text-orange-100/70 text-sm mb-6">
              Discover our latest collection of premium vegetables
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">25% OFF</span>
              <span className="text-xs text-white/70">Use code: <b className="text-white">FRESH25</b></span>
            </div>
            <button className="bg-white dark:bg-orange-500 dark:text-white text-[#f97316] px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-orange-400 transition-colors w-fit shadow-lg dark:shadow-none">
              Explore Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* الخلفية الزخرفية */}
        <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-64 h-64 bg-black/5 dark:bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
      </motion.div>

    </div>
  );
};

export default BannersSection;