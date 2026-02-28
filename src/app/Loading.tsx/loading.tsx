export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* 1. Skeleton Header */}
      <div className="bg-gray-200 py-28 flex flex-col items-center">
        <div className="size-44 md:size-52 bg-gray-300 rounded-[3rem]"></div>
        <div className="mt-10 h-12 w-64 bg-gray-300 rounded-xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20">
        {/* 2. Skeleton Subcategories */}
        <div className="mb-24">
          <div className="h-10 w-48 bg-gray-200 rounded-lg mb-10"></div>
          <div className="flex flex-wrap gap-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="px-10 py-6 w-32 bg-gray-100 rounded-2xl"></div>
            ))}
          </div>
        </div>

        {/* 3. Skeleton Products Grid */}
        <div>
          <div className="h-10 w-48 bg-gray-200 rounded-lg mb-12"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="aspect-[3/4] bg-gray-100 rounded-[2rem]"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}