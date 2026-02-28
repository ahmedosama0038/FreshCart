"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faStar, 
  faTruckFast, 
  faShieldHalved, 
  faCircleCheck 
} from "@fortawesome/free-solid-svg-icons";

export default function SignupHero() {
  return (
    <div className="hidden lg:flex flex-col justify-center w-full max-w-[550px] p-12 space-y-10 animate-in fade-in slide-in-from-left duration-1000">
      
      {/* 1. Header Section */}
      <div className="space-y-4">
        <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Welcome to <span className="text-[#0AAD0A] italic uppercase italic">FreshCart</span>
        </h2>
        <p className="text-[#5c727d] dark:text-gray-400 text-lg leading-relaxed font-medium">
          Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
        </p>
      </div>

      {/* 2. Features List */}
      <div className="space-y-8">
        {[
          { icon: faCircleCheck, title: "Premium Quality", desc: "Premium quality products sourced from trusted suppliers." },
          { icon: faTruckFast, title: "Fast Delivery", desc: "Same-day delivery available in most areas." },
          { icon: faShieldHalved, title: "Secure Shopping", desc: "Your data and payments are completely secure." }
        ].map((feature, index) => (
          <div 
            key={index} 
            className="flex items-start gap-5 group transition-transform duration-300 hover:translate-x-2"
          >
            <div className="bg-green-100 dark:bg-green-500/10 p-4 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-[#0AAD0A] group-hover:text-white">
              <FontAwesomeIcon icon={feature.icon} className="text-[#0AAD0A] group-hover:text-white size-6 transition-colors" />
            </div>
            <div>
              <h4 className="font-black text-gray-900 dark:text-gray-100 text-lg">{feature.title}</h4>
              <p className="text-sm text-[#5c727d] dark:text-gray-500 font-medium">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Testimonial Card - Dark Mode Ready */}
      <div className="bg-white dark:bg-[#111] p-8 rounded-[2rem] shadow-2xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5 relative mt-6 transition-all hover:border-[#0AAD0A]/30">
        <div className="flex items-center gap-4 mb-4">
          <div className="size-14 rounded-full overflow-hidden border-2 border-[#0AAD0A] p-0.5">
            <img 
              src="https://i.pravatar.cc/150?u=sarah" 
              alt="Sarah Johnson" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h5 className="font-black text-gray-900 dark:text-white">Sarah Johnson</h5>
            <div className="flex text-yellow-400 text-xs gap-1">
              {[...Array(5)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} />)}
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm italic leading-relaxed font-medium">
          "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
        </p>
        
        {/* Decorative Badge */}
        <div className="absolute -top-3 -right-3 bg-[#0AAD0A] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-lg">
          Verified User
        </div>
      </div>

    </div>
  );
}