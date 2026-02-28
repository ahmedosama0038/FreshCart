import React from 'react';
import { PackageOpen, ShoppingBag } from 'lucide-react';
import Link from 'next/link'; // لو شغال Next.js أو استبدله بـ <a> عادية

export const NoOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 animate-in fade-in zoom-in duration-500 transition-colors duration-500 bg-white dark:bg-transparent">
      
      {/* Icon Wrapper مع لمسة Glow في الدارك مود */}
      <div className="relative group">
        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full opacity-0 dark:group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative w-28 h-28 bg-gray-50 dark:bg-[#1a1a1a] rounded-[2.5rem] flex items-center justify-center mb-8 shadow-sm border border-gray-100/50 dark:border-gray-800 transition-all duration-500">
          <PackageOpen size={52} className="text-gray-300 dark:text-gray-600 stroke-[1.2]" />
        </div>
      </div>

      {/* النص */}
      <div className="text-center space-y-3 max-w-sm">
        <h2 className="text-3xl font-black text-[#0f172a] dark:text-white tracking-tight">
          No orders yet
        </h2>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed px-4">
          When you place orders, they'll appear here so you can track them effortlessly.
        </p>
      </div>

      {/* زرار البداية */}
      <Link href="/products" className="mt-10">
        <button className="bg-[#16a34a] dark:bg-green-600 hover:bg-[#15803d] dark:hover:bg-green-500 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-100 dark:shadow-none transition-all active:scale-95 flex items-center gap-3 group">
          <ShoppingBag size={20} className="group-hover:rotate-12 transition-transform" />
          Start Shopping
        </button>
      </Link>

    </div>
);
};