"use client";
import { Search, LayoutGrid, List } from "lucide-react";
import { BrandGridProps } from "../types/brand.type";
import { BrandCard } from "./BrandCard";
import { useState } from "react";

export default function BrandGrid({ brands }: BrandGridProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // فلترة الداتا بناء على البحث
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 -mt-12 relative z-20 transition-colors duration-300">
      {/* شريط الإحصائيات والبحث */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4 px-2">
          <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
            <LayoutGrid size={20} />
          </div>
          <div>
            <span className="block font-bold text-gray-800 dark:text-gray-100">{brands.length}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Total Brands</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search brands..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#252525] border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple-500/20 dark:text-white dark:placeholder-gray-500 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* جريد الماركات - هنا بننادي الكومبوننت الصغير بس */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredBrands.map((brand, index) => (
            <BrandCard brand={brand} key={brand._id} index={index} />
        ))}
      </div>
    </div>
  );
}