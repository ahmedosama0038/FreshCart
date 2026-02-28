import { Tag, ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getallCategory } from '../Server/Server.Actions';
import OurCategorys from '@/Features/Home/Components/OurCategorys';
 

export default async function CategoryPage() {
 const categories = await getallCategory();
return (
    <div className='min-h-screen bg-[#F8F9FA] dark:bg-[#0f0f0f] transition-colors duration-300'>
      
      {/* Header Section */}
      <div className="bg-[#22c55e] dark:bg-[#16a34a] pt-16 pb-24 px-4 md:px-12 relative overflow-hidden transition-colors">
        {/* Decorative Circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 dark:bg-black/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className='flex items-center gap-2 text-white/80 text-sm mb-8 bg-black/10 dark:bg-black/20 w-fit px-4 py-2 rounded-full backdrop-blur-sm'>
            <Link href={'/'} className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-white font-bold">Categories</span>
          </nav>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/30 dark:border-white/10 shadow-xl text-white">
              <Tag size={40} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight uppercase">All Categories</h1>
              <p className="text-white/80 text-sm font-medium mt-1">
                Select a category to explore its products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid Container */}
      <div className="container mx-auto px-6 -mt-10 relative z-20 pb-20">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] shadow-xl p-10 border border-gray-100 dark:border-gray-800 transition-colors">
          
          {/* تأكد إن مكون OurCategorys جواه كلاسات بتدعم الدارك مود برضه */}
          <OurCategorys />
          
        </div>
      </div>

    </div>
  )
}