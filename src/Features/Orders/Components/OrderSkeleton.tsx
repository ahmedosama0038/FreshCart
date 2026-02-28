import React from 'react';
export const OrderSkeleton = () => {
  return (
    <div className="space-y-6 w-full animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm transition-colors duration-500">
          
          {/* Header Skeleton */}
          <div className="p-6 flex justify-between items-center bg-gray-50/50 dark:bg-black/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                <div className="h-3 w-16 bg-gray-100 dark:bg-gray-700/50 rounded-lg"></div>
              </div>
            </div>
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>

          {/* Body Skeleton */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
              <div className="flex -space-x-3">
                {[1, 2, 3].map((dot) => (
                  <div key={dot} className="w-14 h-14 rounded-2xl border-2 border-white dark:border-[#1a1a1a] bg-gray-200 dark:bg-gray-800"></div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50/50 dark:bg-black/20 rounded-[1.5rem] p-4 border border-gray-50 dark:border-gray-800">
               <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                    <div className="h-3 w-full bg-gray-100 dark:bg-gray-700/50 rounded-lg"></div>
                  </div>
               </div>
            </div>
          </div>

          {/* Footer Skeleton */}
          <div className="p-6 bg-gray-900 dark:bg-[#0a0a0a] flex justify-between items-center border-t dark:border-gray-800">
            <div className="space-y-2">
              <div className="h-2 w-16 bg-gray-700 dark:bg-gray-800 rounded-full"></div>
              <div className="h-6 w-32 bg-gray-700 dark:bg-gray-800 rounded-lg"></div>
            </div>
            <div className="h-10 w-28 bg-gray-700 dark:bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
};