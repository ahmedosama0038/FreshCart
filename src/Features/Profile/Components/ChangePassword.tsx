"use client";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  changePasswordSchema,
  ChangePasswordValues,
} from "@/Features/Profile/Schema/profile.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { UpdateLoggeduserpassword } from "../Server/profile.action";

export default function ChangePassword() {
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<ChangePasswordValues>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
    reValidateMode: "onChange",
  });

  
  const onSubmit = async (values: ChangePasswordValues) => {
    try {
      const res = await UpdateLoggeduserpassword(values);
      console.log(res);
      if (res.message === "success") {
        toast.success("Password updated successfully!");
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Current Password */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2 tracking-widest">
          Current Password
        </label>
        <div className="relative group">
          <input
            type={showCurrent ? "text" : "password"}
            placeholder="••••••••••••"
            className={`w-full px-5 py-4 rounded-2xl border ${
              errors.currentPassword ? "border-red-500" : "border-gray-100 dark:border-gray-800"
            } bg-gray-50 dark:bg-[#1a1a1a] text-gray-800 dark:text-white outline-none focus:bg-white dark:focus:bg-[#111] focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-bold tracking-widest placeholder:tracking-normal placeholder:font-medium`}
            {...register("currentPassword")}
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-green-500 transition-colors p-2"
          >
            {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.currentPassword && (
          <p className="text-xs text-red-500 font-bold ml-2">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2. New Password */}
        <div className="space-y-2.5">
          <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2 tracking-widest">
            New Password
          </label>
          <div className="relative group">
            <input
              type={showNew ? "text" : "password"}
              placeholder="••••••••••••"
              className={`w-full px-5 py-4 rounded-2xl border ${
                errors.password ? "border-red-500" : "border-gray-100 dark:border-gray-800"
              } bg-gray-50 dark:bg-[#1a1a1a] text-gray-800 dark:text-white outline-none focus:bg-white dark:focus:bg-[#111] focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-bold tracking-widest placeholder:tracking-normal placeholder:font-medium`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-green-500 transition-colors p-2"
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password ? (
            <p className="text-xs text-red-500 font-bold ml-2">
              {errors.password.message}
            </p>
          ) : (
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold ml-2 italic">
              * Must be at least 6 characters
            </p>
          )}
        </div>

        {/* 3. Confirm New Password */}
        <div className="space-y-2.5">
          <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2 tracking-widest">
            Confirm New Password
          </label>
          <div className="relative group">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••••••"
              className={`w-full px-5 py-4 rounded-2xl border ${
                errors.rePassword ? "border-red-500" : "border-gray-100 dark:border-gray-800"
              } bg-gray-50 dark:bg-[#1a1a1a] text-gray-800 dark:text-white outline-none focus:bg-white dark:focus:bg-[#111] focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-bold tracking-widest placeholder:tracking-normal placeholder:font-medium`}
              {...register("rePassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-green-500 transition-colors p-2"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.rePassword && (
            <p className="text-xs text-red-500 font-bold ml-2">
              {errors.rePassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <button
          disabled={isSubmitting}
          className="flex items-center justify-center gap-3 px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-green-200 dark:shadow-none active:scale-95 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed group"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Lock size={18} className="group-hover:rotate-12 transition-transform" /> 
              <span>Update Password</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
