// src/app/(PlatFoorm)/Product/Shop/loading.tsx
export default function Loading() {
  return (
   <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-500">
      {/* Skeleton للهيدر الأخضر */}
      <div className="bg-green-600/10 dark:bg-green-900/20 animate-pulse pt-12 pb-28 px-4 md:px-12 border-b dark:border-white/5">
        <div className="container mx-auto flex items-center gap-6">
          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-800 rounded-3xl" />
          <div className="space-y-3">
            <div className="h-8 w-48 bg-gray-300 dark:bg-gray-800 rounded-lg" />
            <div className="h-4 w-64 bg-gray-300 dark:bg-gray-800 rounded-lg opacity-60" />
          </div>
        </div>
      </div>

      {/* المحتوى السفلي */}
      <div className="container mx-auto flex flex-col md:flex-row gap-6 p-6 -mt-16">
        {/* Skeleton للسايد بار */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] p-6 h-[500px] shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse transition-all">
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg mb-8" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800/40 rounded-2xl mb-4" />
            ))}
          </div>
        </aside>

        {/* Skeleton لكروت المنتجات */}
        <main className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] p-5 h-[400px] shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse flex flex-col gap-4 transition-all"
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-[1.5rem]" />
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                  <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800/50 rounded-lg" />
                </div>
                
                <div className="mt-auto flex gap-2">
                  <div className="h-12 flex-1 bg-gray-100 dark:bg-gray-800/40 rounded-xl" />
                  <div className="h-12 w-12 bg-gray-100 dark:bg-gray-800/40 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}