"use client";

import { Brand, Category } from "@/Features/Products/Types/tyep.prodects";

import { motion } from "framer-motion";
import { useProductFilters } from "../Hooks/useProductFilters";

interface SidebarProps {
  brands?: Brand[];
  categories?: Category[];
}

export default function ProductSidebar({ brands, categories }: SidebarProps) {
  const {
    keyword,
    setKeyword,

    price,
    setPrice,
    applyPrice,

    category,
    brand,

    updateFilter,
    clearAll,

    isPending,
  } = useProductFilters();
  if (!categories) return null

return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-6 shadow-sm sticky top-24 transition-colors duration-500"
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b dark:border-gray-800">
        <div className="flex items-center gap-2 font-extrabold text-[#1a1a1a] dark:text-white">
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[#0aad0a] text-lg"
          >
            ▼
          </motion.span>
          Filters
        </div>

        <button
          onClick={clearAll}
          className="text-xs text-[#0aad0a] dark:text-green-400 font-bold hover:scale-110 transition-transform"
        >
          Clear all
        </button>
      </div>

      {/* Loading indicator */}
      {isPending && (
        <div className="text-[11px] text-[#0aad0a] dark:text-green-400 font-bold animate-pulse">
          Updating filters...
        </div>
      )}

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Search products
        </label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Type to search..."
          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md outline-none transition focus:border-[#0aad0a] dark:focus:border-green-500 focus:ring-1 focus:ring-[#0aad0a] bg-white dark:bg-[#252525] dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
        />
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <label className="text-[13px] font-bold text-gray-800 dark:text-gray-300 uppercase flex items-center gap-2">
          <span>📁</span> Categories
        </label>

        <div className="space-y-1">
          {/* All Categories Option */}
          <label
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
              !category 
                ? "bg-green-50 dark:bg-green-500/10 text-[#0aad0a] dark:text-green-400" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <input
              type="radio"
              name="category"
              checked={!category}
              onChange={() => updateFilter("category", "all")}
              className="accent-[#0aad0a] dark:accent-green-500 h-4 w-4"
            />
            <span className="text-[13px] font-bold">All Categories</span>
          </label>

          {/* List scrollable */}
          <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {categories?.map((cat, i) => (
              <motion.label
                key={cat._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                  category === cat._id 
                    ? "bg-green-50 dark:bg-green-500/10 text-[#0aad0a] dark:text-green-400" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  checked={category === cat._id}
                  onChange={() => updateFilter("category", cat._id)}
                  className="accent-[#0aad0a] dark:accent-green-500 h-4 w-4"
                />
                <span className="text-[13px] font-medium">{cat.name}</span>
              </motion.label>
            ))}
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-4">
        <label className="text-[13px] font-bold text-gray-800 dark:text-gray-300 uppercase flex items-center gap-2">
          <span>🏷️</span> Brands
        </label>

        <div className="border-l-[3px] border-[#0aad0a] dark:border-green-600 pl-3 space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
          <label className="flex items-center gap-3 p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer text-gray-600 dark:text-gray-400">
            <input
              type="radio"
              name="brand"
              checked={!brand}
              onChange={() => updateFilter("brand", "all")}
              className="accent-[#0aad0a] dark:accent-green-500"
            />
            <span className="text-[13px] font-bold">All Brands</span>
          </label>

          {brands?.map((item, i) => (
            <motion.label
              key={item._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.02 }}
              className={`flex items-center gap-3 p-1.5 rounded-md cursor-pointer transition-all ${
                brand === item._id 
                  ? "text-[#0aad0a] dark:text-green-400 font-bold" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <input
                type="radio"
                name="brand"
                checked={brand === item._id}
                onChange={() => updateFilter("brand", item._id)}
                className="accent-[#0aad0a] dark:accent-green-500"
              />
              <span className="text-[13px]">{item.name}</span>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between text-[13px]">
          <span className="text-gray-600 dark:text-gray-400 font-bold">Max Price</span>
          <span className="font-black text-[#0aad0a] dark:text-green-400">{price} EGP</span>
        </div>

        <input
          type="range"
          min="0"
          max="50000"
          step="100"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onMouseUp={applyPrice}
          onTouchEnd={applyPrice}
          className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#0aad0a] dark:accent-green-500"
        />
      </div>
    </motion.div>
  );
}
