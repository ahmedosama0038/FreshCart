// Components/Brands/BrandHeader.tsx
import { Tag } from "lucide-react";
interface BrandHeaderProps {
  total: number;
}
export default function BrandHeader({total}:BrandHeaderProps) {
  return (
   <div className="bg-[#7e22ce] dark:bg-[#2e1065] pt-16 pb-32 px-6 md:px-12 relative overflow-hidden transition-colors duration-700">
      {/* الدوائر الجمالية - زودت لك واحدة كمان عشان العمق */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 dark:bg-purple-500/20 rounded-full -mr-32 -mt-32 blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/30 dark:bg-black/40 rounded-full -ml-20 -mb-20 blur-[80px]" />
      
      {/* تأثير ضوئي خفي (Glow) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent dark:from-purple-500/5 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="flex items-center gap-5">
          {/* الـ Glassmorphism Icon Box */}
          <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-white/10 shadow-2xl shadow-purple-900/20">
            <Tag className="text-white w-8 h-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
          </div>
          
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-sm">
              Shop by Brand
            </h1>
            <p className="text-purple-100/80 dark:text-purple-300/60 text-lg font-medium">
              Discover products from <span className="text-white dark:text-purple-200 font-bold">{total}</span> trusted brands
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}