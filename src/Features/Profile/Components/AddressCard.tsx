// نفس الإمبورتات بتاعتك بالظبط
import React from "react";
import { MapPin, Phone, User, Trash2, Home } from "lucide-react";
import { AddressCardProps } from "../types/profile.types";
import { RemoveFromAddress } from "../Server/profile.action";
import { toast } from "react-toastify";


export const AddressCard = ({ address, onDeleteSuccess, ...rest }: any) => {
  
  // فككنا الحاجات الزيادة من الـ rest
  const { isSelected, onSelect, isCheckout } = rest;

  const handelAddres = async (e: React.MouseEvent) => {
    e.stopPropagation(); // عشان لو دوست حذف في البروفايل ميعملش Selection
    try {
      const respons = await RemoveFromAddress({ addresId: address._id });
      if (respons.status === "success") {
        toast.success(respons.message);
        onDeleteSuccess(respons.data);
      }
    } catch (error) {
      toast.error("Failed to remove Address!");
    }
  };
return (
    <div 
      // لو إحنا في التشيك أوت، الكارت كله بيبقى زرار اختيار
      onClick={() => isCheckout && onSelect?.(address._id)}
      className={`group relative rounded-[2.5rem] border-2 p-6 transition-all duration-500 cursor-pointer overflow-hidden ${
        isSelected 
          ? "border-green-600 bg-green-50/50 dark:bg-green-500/10 shadow-xl shadow-green-100/20 dark:shadow-none" 
          : "bg-white dark:bg-[#1a1a1a] border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-900/50 hover:shadow-2xl hover:shadow-green-50/50 dark:hover:shadow-none"
      }`}
    >
      {/* خلفية جمالية تظهر عند الاختيار فقط */}
      {isSelected && (
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-600/5 rounded-full blur-2xl" />
      )}

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 ${
          isSelected 
            ? "bg-green-600 text-white border-green-600" 
            : "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-100 dark:border-green-500/20"
        }`}>
          <Home size={14} className={isSelected ? "text-white" : "text-green-600 dark:text-green-400"} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            {address.name}
          </span>
        </div>

        {/* التبديل بين حالة الـ Checkout والـ Profile */}
        <div className="flex items-center">
          {isCheckout ? (
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
              isSelected 
                ? "bg-green-600 border-green-600 scale-110 rotate-[360deg]" 
                : "border-gray-200 dark:border-gray-700"
            }`}>
              {isSelected && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation(); // عشان ميعملش Select لو ضغطنا حذف
                handelAddres(e);
              }}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all active:scale-90"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* اللوكيشن */}
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-gray-50 dark:bg-[#252525] rounded-xl flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-800 group-hover:border-green-200 dark:group-hover:border-green-900/50 transition-colors">
            <MapPin size={18} className="text-gray-400 dark:text-gray-500 group-hover:text-green-500 transition-colors" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Location</p>
            <p className="text-sm font-black text-gray-800 dark:text-white">{address.city}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{address.details}</p>
          </div>
        </div>

        {/* الكونتاكت */}
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-gray-50 dark:bg-[#252525] rounded-xl flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-800 group-hover:border-green-200 dark:group-hover:border-green-900/50 transition-colors">
            <Phone size={18} className="text-gray-400 dark:text-gray-500 group-hover:text-green-500 transition-colors" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Contact Number</p>
            <p className="text-base font-black text-green-600 dark:text-green-400 tracking-tight">{address.phone}</p>
          </div>
        </div>
      </div>
      
      {/* تأثير خط سفلي يظهر عند الهوفر */}
      <div className={`absolute bottom-0 left-0 h-1.5 bg-green-600 transition-all duration-500 ${isSelected ? "w-full" : "w-0 group-hover:w-full opacity-30"}`} />
    </div>
  );
};