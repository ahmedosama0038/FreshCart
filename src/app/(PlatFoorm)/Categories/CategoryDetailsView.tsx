"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PackageOpen } from "lucide-react";
import ProductCard from "@/Features/Products/Components/ProductCard";
import { Category, SubCategory } from "@/Features/Category/Types/Types.Category";
import { Product } from "@/Features/Products/Types/tyep.prodects";

interface Props {
  category: Category;
  subCategories: SubCategory[];
  products: Product[];
}

export default function CategoryDetailsView({ category, subCategories, products }: Props) {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      {/* ================= HEADER ================= */}
      <header className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#0f172a] dark:from-[#05150e] dark:via-[#0a2118] dark:to-[#020617]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative size-48 md:size-56 bg-white/10 backdrop-blur-2xl p-6 rounded-[3.5rem] border border-white/20 shadow-2xl"
          >
            <div className="relative w-full h-full bg-white dark:bg-[#1a1a1a] rounded-[2.8rem] overflow-hidden flex items-center justify-center shadow-inner group">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </div>
          </motion.div>

          <h1 className="mt-12 text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl uppercase italic">
            {category.name}
          </h1>

          <div className="mt-8 flex items-center gap-3">
             <div className="w-12 h-1.5 bg-green-500 rounded-full" />
             <span className="text-green-400 font-black tracking-[0.3em] text-xs uppercase">Collection 2026</span>
             <div className="w-12 h-1.5 bg-green-500 rounded-full" />
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-6 py-24">
        {/* SubCategories Section */}
        <section className="mb-28">
          <div className="space-y-2 mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
              Explore <span className="text-green-600 italic">Sub-Sections</span>
            </h2>
            <p className="text-gray-400 font-medium">Refine your search within {category.name}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {subCategories?.length > 0 ? (
              subCategories.map((sub) => (
                <button key={sub._id} className="px-8 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-black text-xs uppercase tracking-widest hover:border-green-600 transition-all active:scale-95">
                  {sub.name}
                </button>
              ))
            ) : (
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#111] px-8 py-5 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 text-gray-400 text-xs font-black uppercase">
                Pure Collection Only
              </div>
            )}
          </div>
        </section>

        {/* Products Grid */}
        <section>
          <div className="flex items-center justify-between mb-16 border-b border-gray-100 dark:border-gray-800 pb-8">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
              Premium <span className="text-green-600">Selection</span>
            </h2>
          </div>

          {products?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-12">
              {products.map((product) => (
                <ProductCard key={product._id} info={product} />
              ))}
            </div>
          ) : (
            <div className="w-full py-32 text-center bg-gray-50/50 dark:bg-[#0f0f0f] rounded-[4rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
               <PackageOpen size={48} className="mx-auto mb-6 text-gray-300" />
               <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">No products at the moment</h3>
               <Link href="/Product/Shop" className="mt-8 inline-block px-10 py-4 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-500/20">
                  Explore Shop
               </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}