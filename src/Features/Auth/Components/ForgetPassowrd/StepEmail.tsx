"use client";

import { useState } from 'react';
import { toast } from 'react-toastify';

// أضفنا onBack هنا ليعمل زر العودة
interface StepEmailProps {
  onNext: (email: string) => void;
  onBack?: () => void;
  loading?: boolean; 
}

export default function StepEmail({ onNext,  loading,onBack }: StepEmailProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email || !email.includes('@')) {
       // بدلاً من alert العادي، يمكنك مستقبلاً استخدام toast.error
    toast.error("Please enter a valid email address");
       return;
    }
    onNext(email);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 ease-out">
      
      {/* 1. Header Section */}
      <div className="text-center lg:text-left space-y-3">
        <div className="inline-flex items-center justify-center size-12 bg-green-50 dark:bg-green-500/10 rounded-2xl mb-2 text-[#0AAD0A]">
           <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
           </svg>
        </div>
        <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
          Account <span className="text-[#0AAD0A]">Recovery</span>
        </h3>
        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium leading-relaxed">
          No worries. Enter your registered email and we'll dispatch a secure reset code to your inbox.
        </p>
      </div>

      <div className="space-y-5">
        
        {/* 2. Email Input Group */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] ml-2">
            Verification Email
          </label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="name@company.com"
            // تم تحسين الـ transition هنا ليكون أنعم
            className="w-full px-6 py-4 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#111] dark:text-white outline-none focus:bg-white dark:focus:bg-[#0a0a0a] focus:border-[#0AAD0A] focus:ring-4 focus:ring-[#0AAD0A]/5 transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700 shadow-sm"
          />
        </div>

        {/* 3. Action Button - لاحظ تصحيح كلمة loading */}
        <button 
          onClick={handleSubmit} 
          disabled={loading} // تم التصحيح من Loading لـ loading
          className="w-full py-5 bg-[#0AAD0A] hover:bg-[#099609] text-white font-black text-xs uppercase tracking-[0.2em] rounded-[1.5rem] shadow-2xl shadow-green-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loading ? (
             <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Send Reset Code
              <svg className="size-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>

        {/* 4. Support Footer */}
        <p className="text-center text-xs text-gray-400 font-medium pt-2">
          Remembered your password? 
          <button 
            type="button" 
            onClick={onBack} 
            className="ml-2 text-[#0AAD0A] font-black uppercase tracking-widest text-[10px] hover:underline transition-all"
          >
            Go back to login
          </button>
        </p>
      </div>
    </div>
  );
}