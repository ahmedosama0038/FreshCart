// src/Features/Addresses/components/NoAddresses.tsx
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";


export default function NoAddresses() {
 return (
    <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-[3rem] shadow-sm transition-all duration-500 overflow-hidden relative">
      
      {/* دوائر جمالية في الخلفية */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl" />

      <div className="relative group">
        {/* أيقونة اللوكيشن مع تأثير نبض (Pulse) */}
        <div className="bg-green-50 dark:bg-green-500/10 p-8 rounded-[2.5rem] mb-6 transition-transform group-hover:scale-110 duration-500 border border-green-100 dark:border-green-500/20">
          <MapPin size={48} className="text-green-600 dark:text-green-400" strokeWidth={1.5} />
        </div>
        {/* علامة + صغيرة فوق الأيقونة */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-[#111] rounded-full flex items-center justify-center shadow-lg border border-gray-50 dark:border-gray-800">
          <span className="text-green-600 dark:text-green-400 font-black text-xl">+</span>
        </div>
      </div>

      <h3 className="text-2xl font-black text-[#0f172a] dark:text-white tracking-tight">
        No Addresses Yet
      </h3>
      
      <p className="text-gray-400 dark:text-gray-500 text-sm mt-3 mb-10 text-center max-w-[280px] font-medium leading-relaxed">
        Add your first delivery address to make checkout <span className="text-green-600 dark:text-green-400 font-bold">faster and easier</span>.
      </p>

      <Link 
        href="/profile/addresses/add" 
        className="group bg-[#22c55e] hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-green-100 dark:shadow-none flex items-center gap-3"
      >
        Add Your First Address
        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}