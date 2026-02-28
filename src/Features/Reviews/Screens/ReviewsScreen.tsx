"use client";
import React, { useState, useEffect } from "react";
import { Star, ChevronDown, CheckCircle2, Quote, Loader2 } from "lucide-react";
import { GetAllReviews } from "../server/Reviews.actions";


export default function GlobalReviewsScreen() {
  const [allReviews, setAllReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    async function getStats() {
      const res = await GetAllReviews();
      if (res.success) {
        setAllReviews(res.data.data || res.data || []);
      }
      setLoading(false);
    }
    getStats();
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
      <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Loading Experience</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-[#0a0a0a] py-20 px-4 transition-colors duration-500">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
            Community <span className="text-green-600">Feedback</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium max-w-md mx-auto">
            Real stories from our community. Click on any review to explore the full story.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {allReviews.map((rev: any) => {
            const isOpen = openId === rev._id;
            return (
              <div 
                key={rev._id} 
                className={`group bg-white dark:bg-[#1a1a1a] border rounded-[2rem] transition-all duration-500 overflow-hidden ${
                  isOpen 
                    ? "border-green-500 shadow-2xl shadow-green-500/10 scale-[1.02]" 
                    : "border-gray-100 dark:border-gray-800 shadow-sm hover:border-green-200 dark:hover:border-green-900/30"
                }`}
              >
                {/* Header (The Row) */}
                <div 
                  onClick={() => toggleAccordion(rev._id)}
                  className="p-6 md:p-8 cursor-pointer flex items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                    {/* Avatar with dynamic ring */}
                    <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-sm transition-all duration-500 ${
                      isOpen ? "bg-green-600 text-white rotate-12" : "bg-gray-900 dark:bg-[#252525] text-white"
                    }`}>
                      {rev.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="truncate space-y-1">
                      <h4 className="font-black text-gray-800 dark:text-white text-base truncate">
                        {rev.user?.name}
                      </h4>
                      <p className={`text-xs font-medium transition-colors duration-300 truncate ${
                        isOpen ? "text-green-600" : "text-gray-400"
                      }`}>
                        {isOpen ? "Reading full review..." : rev.review.substring(0, 50) + "..."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-1 bg-gray-50 dark:bg-[#252525] px-3 py-1.5 rounded-full">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-black text-gray-700 dark:text-gray-300">{rev.rating}</span>
                    </div>
                    
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isOpen ? "bg-green-50 dark:bg-green-500/10 text-green-600" : "bg-gray-50 dark:bg-[#252525] text-gray-300"
                    }`}>
                      <ChevronDown size={20} className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </div>

                {/* Content (Expandable Area) */}
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-8 md:px-8 md:pb-10 border-t border-gray-50 dark:border-gray-800">
                    <div className="relative mt-6 bg-gray-50 dark:bg-[#0f0f0f] p-8 rounded-[2.5rem] overflow-hidden group/content">
                      <Quote className="absolute -top-2 -right-2 w-24 h-24 text-green-500/5 -rotate-12 transition-transform group-hover/content:rotate-0 duration-700" />
                      
                      <p className="relative z-10 text-gray-700 dark:text-gray-300 leading-relaxed font-bold italic text-lg md:text-xl">
                        "{rev.review}"
                      </p>

                      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
                          <CheckCircle2 size={14} className="text-green-600 dark:text-green-400" />
                          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-green-700 dark:text-green-400">Verified Purchase</span>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-gray-400 dark:text-gray-600 font-black uppercase tracking-widest">Date of experience</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">
                            {new Date(rev.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {rev.product && (
                      <div className="mt-6 flex items-center gap-3 px-6 py-4 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">About Product:</span>
                        <span className="text-xs font-black text-gray-900 dark:text-white hover:text-green-600 cursor-pointer transition-colors uppercase tracking-tighter">
                          {rev.product.title}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}