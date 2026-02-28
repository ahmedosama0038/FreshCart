"use client";
import React, { useEffect, useState } from "react";


import ProductCard from "../ProductCard";
import { Product } from "../../Types/tyep.prodects";
import getAllProduct from "../../Server/ServerProduct.actions";

interface Props {
  categoryId: string;
  currentProductId: string;
}

export const RelatedProducts = ({ categoryId, currentProductId }: Props) => {
const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  async function fetchRelated() {
    try {
      // بنعرف التايب هنا عشان الـ TypeScript يفهم الـ data اللي راجعة
      const res = await getAllProduct({ category: categoryId });

      // التأكد إن الـ data موجودة وهي Array
      if (res && res.data) {
        const filtered = res.data.filter((p) => p._id !== currentProductId);
        setRelated(filtered.slice(0, 10));
      }
    } catch (error) {
      console.error("Related Products Error:", error);
    } finally {
      setLoading(false);
    }
  }
  fetchRelated();
}, [categoryId, currentProductId]);

  if (!loading && related.length === 0) return null;
return (
  <div className="mt-20 space-y-8">
    {/* Section Header */}
    <div className="flex items-center gap-3 px-4">
      <div className="w-2 h-8 bg-green-600 dark:bg-green-500 rounded-full" />
      <h2 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tight">
        You May Also Like
      </h2>
    </div>

    {/* Scroll Container with Fading Edges */}
    <div className="relative group overflow-hidden">
      {/* تأثير التلاشي يمين وشمال */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50/50 dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50/50 dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div className="flex gap-6 animate-scroll w-max py-4 hover:[animation-play-state:paused] transition-all">
        {loading ? (
          <div className="flex gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-[250px] h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          [...related, ...related].map((product: any, index) => (
            <div key={index} className="min-w-[250px] transform transition-transform duration-500 hover:-translate-y-2">
              <ProductCard info={product} />
            </div>
          ))
        )}
      </div>
    </div>

    {/* CSS Animation (ضيف ده في ملف الـ CSS عندك لو مش موجود) */}
    <style jsx>{`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-50% - 12px)); }
      }
      .animate-scroll {
        animation: scroll 30s linear infinite;
      }
    `}</style>
  </div>
);

};