

import Link from "next/link";
import Image from "next/image";
import { getallCategory, Getspecificcategory } from "@/Features/Category/Server/Server.Actions";
import { ArrowRightIcon } from "lucide-react";


export default  async function OurCategorys() {
   




 const response = await getallCategory()
return (
    <section className="p-8 bg-white dark:bg-[#0f0f0f] transition-colors duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 container mx-auto">
        <div className="flex items-center gap-3 border-l-[4px] border-[#2d6a4f] dark:border-green-500 pl-3">
          <h2 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
            Shop By <span className="text-green-600 dark:text-green-500">Category</span>
          </h2>
        </div>
        <Link href="/categories" className="text-[#2d6a4f] dark:text-green-500 text-sm font-bold flex items-center gap-2 group">
          View All Categories   
          <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" /> 
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 container mx-auto">
        {response.data.map((cat) => (
          <Link key={cat._id} href={`Categories/${cat._id}`}>
            <div className="flex flex-col items-center group cursor-pointer">
              {/* صورة الكاتجري */}
              <div className="relative size-32 md:w-44 md:h-44 rounded-[2rem] bg-[#f9f9f9] dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 overflow-hidden flex items-center justify-center shadow-sm group-hover:shadow-md dark:group-hover:shadow-green-500/10 group-hover:border-green-500/30 transition-all duration-300">
                <Image
                  src={cat.image} // رابط الصورة من الداتا
                  alt={cat.name}
                  fill
                  className="object-contain p-6 dark:opacity-90 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* اسم الكاتجري */}
              <span className="mt-4 text-center font-bold text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors uppercase text-xs tracking-wider">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}