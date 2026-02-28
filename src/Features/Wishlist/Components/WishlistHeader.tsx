"use client";
import React from "react";
import { Heart, ShoppingBag, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/Store/Store";
import { WishlistCard } from "./WishlistCard";
import { EmptyWishlist } from "./EmptyWishlist ";


export const WishlistHeader = () => {

    const { products}=useAppSelector((state)=> state.wishlist)
    return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500 py-12 px-4 md:px-8">
      {products.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* 1. Breadcrumbs - Glassmorphism style */}
          <nav className="flex items-center gap-3 text-[10px] font-black text-gray-400 dark:text-gray-600 mb-10 uppercase tracking-[0.2em] ml-2">
            <Link href="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-gray-300 dark:text-gray-800" />
            <span className="text-gray-900 dark:text-white">Wishlist</span>
          </nav>

          {/* 2. Main Header Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 bg-gray-50/50 dark:bg-[#1a1a1a]/40 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm">
            {/* Left Side: Icon & Title */}
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-[2rem] flex items-center justify-center shadow-xl shadow-red-100 dark:shadow-none border border-red-100 dark:border-red-500/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Heart size={36} className="text-red-500 fill-red-500 animate-pulse" />
                </div>
                {/* Badge عدد المنتجات فوق الأيقونة */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#0f172a] dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-[10px] font-black shadow-lg">
                  {products.length}
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-4xl font-black text-[#0f172a] dark:text-white tracking-tighter">
                  My <span className="text-red-500">Wishlist</span>
                </h1>
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  You have {products.length} {products.length > 1 ? "saved treasures" : "saved treasure"}
                </p>
              </div>
            </div>

            {/* Right Side: Quick Action */}
            <Link
              href="/Product"
              className="group flex items-center gap-4 bg-[#0f172a] dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-black px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-2xl shadow-gray-200 dark:shadow-none"
            >
              <ShoppingBag size={20} className="group-hover:-translate-y-0.5 transition-transform" />
              <span>Continue Shopping</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* 3. Products Grid/List Container */}
          <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {products.map((product) => (
              <WishlistCard key={product.id} Info={product} />
            ))}
          </div>

          {/* 4. Footer Summary (Optional but nice) */}
          <div className="mt-12 text-center py-10 border-t border-gray-100 dark:border-gray-800">
             <p className="text-gray-400 dark:text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
               All prices include VAT and shipping updates
             </p>
          </div>
        </div>
      )}
    </div>
  );
};