"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLock,
  faUser,
  faPhone,
  faSpinner,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ErrorMessage from "../Error/ErrorMessage";

export default function SignupForm({ register, handleSubmit, onSubmit, errors, isSubmitting, passwordValue }: any) {
  
  // منطق حساب قوة كلمة المرور بصرياً (يمكنك ربطه بـ Password Value لاحقاً)
  const strength = passwordValue?.length > 8 ? 3 : passwordValue?.length > 5 ? 2 : passwordValue?.length > 0 ? 1 : 0;

  return (
    <div className="w-full max-w-[550px] p-8 lg:p-12 space-y-8 bg-white dark:bg-[#0f0f0f] rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-50 dark:border-gray-900 animate-in fade-in zoom-in-95 duration-700">
      
      {/* 1. Header Section */}
      <div className="space-y-3 text-center lg:text-left">
        <h1 className="text-4xl font-black text-[#0AAD0A] tracking-tighter uppercase italic">
          Join <span className="text-gray-900 dark:text-white">FreshCart</span>
        </h1>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          Create Your Account
        </h2>
        <p className="text-gray-400 dark:text-gray-500 font-medium text-sm leading-relaxed">
          Sign up to start your premium grocery shopping experience.
        </p>
      </div>

      {/* 2. Social Login - Match Login Style */}
      <div className="grid grid-cols-2 gap-4">
        <button type="button" className="flex items-center justify-center gap-3 py-4 border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all font-black text-[10px] uppercase tracking-widest active:scale-95 shadow-sm">
          <FontAwesomeIcon icon={faGoogle} className="text-[#DB4437] text-lg" />
          Google
        </button>
        <button type="button" className="flex items-center justify-center gap-3 py-4 border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all font-black text-[10px] uppercase tracking-widest active:scale-95 shadow-sm">
          <FontAwesomeIcon icon={faFacebookF} className="text-[#1877F2] text-lg" />
          Facebook
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-full h-[1px] bg-gray-100 dark:bg-gray-800"></div>
        <span className="absolute bg-white dark:bg-[#0f0f0f] px-6 text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">
          Personal Details
        </span>
      </div>

      {/* 3. Signup Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
          <div className="relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0AAD0A] transition-colors">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-transparent focus:border-[#0AAD0A] dark:text-white outline-none transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700"
              {...register("name")}
            />
          </div>
          {errors.name && <ErrorMessage message={errors.name.message} />}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0AAD0A] transition-colors">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-transparent focus:border-[#0AAD0A] dark:text-white outline-none transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700"
              {...register("email")}
            />
          </div>
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>

        {/* Password Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0AAD0A] transition-colors">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-transparent focus:border-[#0AAD0A] dark:text-white outline-none transition-all font-bold placeholder:text-gray-300"
                {...register("password")}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm</label>
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0AAD0A] transition-colors">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-transparent focus:border-[#0AAD0A] dark:text-white outline-none transition-all font-bold placeholder:text-gray-300"
                {...register("rePassword")}
              />
            </div>
          </div>
        </div>
        
        {/* Password Strength Indicator */}
        <div className="flex items-center gap-3 px-1">
          <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
             <div className={`h-full transition-all duration-500 ${strength === 1 ? 'w-1/3 bg-red-500' : strength === 2 ? 'w-2/3 bg-orange-500' : strength === 3 ? 'w-full bg-[#0AAD0A]' : 'w-0'}`}></div>
          </div>
          <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">
             {strength === 1 ? 'Weak' : strength === 2 ? 'Medium' : strength === 3 ? 'Strong' : 'Strength'}
          </span>
        </div>
        {(errors.password || errors.rePassword) && <ErrorMessage message={errors.password?.message || errors.rePassword?.message} />}

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
          <div className="relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0AAD0A] transition-colors">
              <FontAwesomeIcon icon={faPhone} />
            </span>
            <input
              type="tel"
              placeholder="+20 123 456 7890"
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-transparent focus:border-[#0AAD0A] dark:text-white outline-none transition-all font-bold placeholder:text-gray-300"
              {...register("phone")}
            />
          </div>
          {errors.phone && <ErrorMessage message={errors.phone.message} />}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3 px-1 pt-2">
          <input
            type="checkbox"
            id="terms"
            className="accent-[#0AAD0A] size-5 rounded-lg border-gray-200 mt-0.5 cursor-pointer"
            {...register("Terms")}
          />
          <label htmlFor="terms" className="text-xs font-bold text-gray-400 dark:text-gray-500 leading-tight cursor-pointer">
            I accept the <Link href="/terms" className="text-[#0AAD0A] underline decoration-2">Terms of Service</Link> and <Link href="/privacy" className="text-[#0AAD0A] underline decoration-2">Privacy Policy</Link>
          </label>
        </div>
        {errors.Terms && <ErrorMessage message={errors.Terms.message} />}

        {/* Submit Button */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-[#0AAD0A] hover:bg-[#099609] text-white py-5 rounded-[1.5rem] flex justify-center items-center gap-4 font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-green-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
        >
          {isSubmitting ? (
            <FontAwesomeIcon icon={faSpinner} spin className="text-lg" />
          ) : (
            <>
              <FontAwesomeIcon icon={faUserPlus} className="text-lg" />
              <span>Create My Account</span>
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center pt-6 border-t border-gray-50 dark:border-gray-900">
        <p className="text-gray-400 font-medium text-sm">
          Already a member?{" "}
          <Link href="/Login" className="text-[#0AAD0A] font-black uppercase tracking-tighter hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}