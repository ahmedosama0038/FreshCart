"use client";
import React, { useState } from "react";
import { MapPin, Phone, Home, Info, Plus, Loader2, ChevronRight } from "lucide-react"; // ضيف Loader2
import { SubmitHandler, useForm } from "react-hook-form";
import { SchemaAddress, SchemaAddressValues } from "../Schema/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/Features/Auth/Components/Error/ErrorMessage";
import { AddToaddress } from "../Server/profile.action";
import { toast } from "react-toastify";
interface Props {
  onAddSuccess: () => void;
}

export const AddAddressForm = ({ onAddSuccess }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchemaAddressValues>({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    reValidateMode: "onChange",
    resolver: zodResolver(SchemaAddress),
  });

  const onsubmit: SubmitHandler<SchemaAddressValues> = async (values) => {
    try {
      const res = await AddToaddress(values);
      console.log(values);
      if (res.status === "success") {
        toast.success(res.message || "Address added successfully!");
        reset();
        setIsOpen(false);
        onAddSuccess();
      } else {
        toast.error(res.message || "Failed to add address");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };
return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-6 md:p-8 shadow-sm transition-all duration-500">
      {/* Header - Click to Toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer group"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-green-50 dark:bg-green-500/10 rounded-[1.25rem] flex items-center justify-center border border-green-100 dark:border-green-500/20 group-hover:scale-110 transition-all duration-300">
            <Plus
              className={`text-green-600 dark:text-green-400 transition-transform duration-500 ${isOpen ? "rotate-45 text-red-500 dark:text-red-400" : ""}`}
              size={28}
              strokeWidth={3}
            />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#0f172a] dark:text-white transition-colors">
              Add New Address
            </h2>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mt-0.5">
              Shipping Information
            </p>
          </div>
        </div>
        
        {/* سهم جانبي يوضح إن فيه أكشن */}
        {!isOpen && <ChevronRight className="text-gray-300 group-hover:translate-x-1 transition-transform" size={20} />}
      </div>

      {isOpen && (
        <form
          className="mt-10 animate-in fade-in slide-in-from-top-6 duration-500"
          onSubmit={handleSubmit(onsubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            {/* Address Label Input */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-3 tracking-widest">
                Address Label (e.g. Home)
              </label>
              <div className="relative group">
                <Home
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 transition-colors"
                  size={18}
                />
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Home, Work, etc."
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#252525] border ${errors.name ? "border-red-500" : "border-gray-100 dark:border-gray-800"} rounded-2xl focus:bg-white dark:focus:bg-[#111] focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-bold text-sm text-gray-800 dark:text-white`}
                />
              </div>
              {errors.name && <ErrorMessage message={errors.name.message} />}
            </div>

            {/* City Input */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-3 tracking-widest">
                City
              </label>
              <div className="relative group">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 transition-colors"
                  size={18}
                />
                <input
                  {...register("city")}
                  type="text"
                  placeholder="e.g. Cairo"
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#252525] border ${errors.city ? "border-red-500" : "border-gray-100 dark:border-gray-800"} rounded-2xl focus:bg-white dark:focus:bg-[#111] focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-bold text-sm text-gray-800 dark:text-white`}
                />
              </div>
              {errors.city && <ErrorMessage message={errors.city.message} />}
            </div>

            {/* Phone Input */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-3 tracking-widest">
                Phone Number
              </label>
              <div className="relative group">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 transition-colors"
                  size={18}
                />
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#252525] border ${errors.phone ? "border-red-500" : "border-gray-100 dark:border-gray-800"} rounded-2xl focus:bg-white dark:focus:bg-[#111] focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-bold text-sm text-gray-800 dark:text-white`}
                />
              </div>
              {errors.phone && <ErrorMessage message={errors.phone.message} />}
            </div>

            {/* Details Input */}
            <div className="space-y-2.5 md:col-span-2">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-3 tracking-widest">
                Detailed Address
              </label>
              <div className="relative group">
                <Info
                  className="absolute left-4 top-5 text-gray-300 group-focus-within:text-green-500 transition-colors"
                  size={18}
                />
                <textarea
                  {...register("details")}
                  rows={3}
                  placeholder="Street name, Building number, Apartment..."
                  className={`w-full pl-12 pr-4 py-5 bg-gray-50 dark:bg-[#252525] border ${errors.details ? "border-red-500" : "border-gray-100 dark:border-gray-800"} rounded-[1.5rem] focus:bg-white dark:focus:bg-[#111] focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-bold text-sm text-gray-800 dark:text-white resize-none`}
                />
              </div>
              {errors.details && <ErrorMessage message={errors.details.message} />}
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] bg-[#22c55e] hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-800 text-white py-4.5 rounded-[1.25rem] font-black text-sm transition-all active:scale-95 shadow-xl shadow-green-200 dark:shadow-none flex items-center justify-center gap-3 group"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Save Address</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-4.5 bg-gray-100 dark:bg-[#252525] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#333] rounded-[1.25rem] font-black text-sm transition-all active:scale-95"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
