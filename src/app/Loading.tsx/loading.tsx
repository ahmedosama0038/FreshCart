import React from 'react'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#050505]">
      <div className="flex flex-col items-center gap-4">
        {/* سبينر أخضر شيك */}
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        
        {/* نص متحرك */}
        <h2 className="text-xl font-black text-green-600 tracking-widest uppercase animate-pulse">
         LuxeMart.Loading...
        </h2>
      </div>
    </div>
  )
}