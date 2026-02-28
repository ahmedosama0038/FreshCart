"use client";
import React from "react";
import { User, MapPin, Settings, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MyAccountLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  // خليت الأيقونات هنا عبارة عن الـ Component نفسه مش الـ Element
  // ده بيخلي التعامل معاها أسهل وأنضف بكتير
  const menuItems = [
    {
      name: "My Addresses",
      icon: MapPin,
      path: "/Porfile/Addrees",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/Porfile/Settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* 1. الـ Header الأخضر الكبير */}
      <div className="bg-[#22c55e] dark:bg-[#16a34a] pt-12 pb-32 px-4 md:px-12 relative overflow-hidden">
        {/* لمسة جمالية: دوائر خلفية خفيفة */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        
        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-white/30 dark:border-white/10 shadow-2xl text-white">
              <User size={40} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                My Account
              </h1>
              <p className="text-white/80 dark:text-green-100/70 text-sm font-medium mt-1">
                Manage your profile and addresses
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. منطقة الـ Sidebar والمحتوى */}
      <div className="container mx-auto px-4 -mt-16 pb-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* الـ Sidebar الجانبي */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-4 shadow-xl shadow-black/5 transition-all">
              <p className="px-4 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] border-b border-gray-50 dark:border-gray-800 mb-4">
                Account Menu
              </p>

              <div className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.path;
                  // هنا بنحول الـ icon لمتغير بتبدأ بحرف Capital عشان React يعرف إنه Component
                  const IconComponent = item.icon;

                  return (
                    <Link key={item.path} href={item.path}>
                      <div
                        className={`w-full flex items-center justify-between p-4 rounded-[1.5rem] font-black text-sm transition-all group ${
                          isActive
                            ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-500/20 shadow-sm"
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#252525] border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isActive
                                ? "bg-green-500 text-white shadow-lg shadow-green-200 dark:shadow-none scale-110"
                                : "bg-gray-100 dark:bg-[#252525] text-gray-400 group-hover:bg-white dark:group-hover:bg-[#1a1a1a] group-hover:scale-110"
                            }`}
                          >
                            {/* الرندر هنا بقى مباشر وبسيط جداً */}
                            <IconComponent size={18} strokeWidth={isActive ? 2.5 : 2} />
                          </div>
                          <span className="tracking-tight">{item.name}</span>
                        </div>
                        <ChevronRight
                          size={18}
                          className={`transition-all duration-300 ${
                            isActive 
                              ? "translate-x-0 opacity-100 text-green-500" 
                              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* 3. منطقة المحتوى المتغير (Children) */}
          <main className="flex-1 min-w-0 animate-in fade-in slide-in-from-right-4 duration-500">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};