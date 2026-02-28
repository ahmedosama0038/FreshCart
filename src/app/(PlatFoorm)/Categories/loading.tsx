"use client";
export default function LoadingCategories() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] overflow-hidden">
      {/* 1. Skeleton Header - Premium Deep Style */}
      <div className="bg-gray-50 dark:bg-[#111] pt-24 pb-32 px-6 md:px-12 relative">
        <div className="container mx-auto">
          {/* Breadcrumb Skeleton */}
          <div className="h-4 w-32 bg-gray-200 dark:bg-[#1a1a1a] rounded-full mb-10 animate-pulse"></div>
          
          <div className="flex items-center gap-8">
            {/* Category Icon Skeleton */}
            <div className="w-24 h-24 bg-gray-200 dark:bg-[#1a1a1a] rounded-[2.5rem] animate-pulse"></div>
            
            <div className="space-y-4">
              {/* Title Skeleton */}
              <div className="h-12 w-72 bg-gray-200 dark:bg-[#1a1a1a] rounded-2xl animate-pulse"></div>
              {/* Subtitle Skeleton */}
              <div className="h-4 w-48 bg-gray-200 dark:bg-[#1a1a1a] rounded-xl animate-pulse opacity-60"></div>
            </div>
          </div>
        </div>
        
        {/* تأثير حركي انسيابي في الخلفية */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent" />
      </div>

      {/* 2. Skeleton Grid Container */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-white dark:bg-[#0f0f0f] rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)] dark:shadow-none p-12 border border-gray-50 dark:border-gray-900">
          
          {/* Section Title Skeleton */}
          <div className="h-8 w-48 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl mb-12 animate-pulse"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex flex-col items-center group">
                {/* Image Skeleton with Shimmer Effect */}
                <div className="relative w-full aspect-square bg-gray-100 dark:bg-[#1a1a1a] rounded-[2.5rem] mb-6 overflow-hidden">
                   {/* Shimmer Overlay */}
                   <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />
                </div>
                
                {/* Text Skeletons */}
                <div className="h-5 w-3/4 bg-gray-100 dark:bg-[#1a1a1a] rounded-lg animate-pulse mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg animate-pulse opacity-50"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind Custom Keyframe (Add this to your globals.css or tailwind config) */}
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}