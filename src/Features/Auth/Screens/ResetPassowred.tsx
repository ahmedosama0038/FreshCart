"use client";

import { useState } from 'react';
import { 
  faLock, 
  faEye, 
  faEyeSlash, 
  faShieldHalved 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StepResetPassword({ email, onComplete }: { email: string, onComplete: (pass: string) => void }) {
  const [newPassword, setNewPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // منطق حساب قوة الباسورد
  const strength = newPassword.length === 0 ? 0 : newPassword.length < 6 ? 1 : newPassword.length < 10 ? 2 : 3;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 ease-out">
      
      {/* 1. Header Section */}
      <div className="text-center lg:text-left space-y-3">
        <div className="inline-flex items-center justify-center size-12 bg-green-50 dark:bg-green-500/10 rounded-2xl mb-2 text-[#0AAD0A]">
           {/* استخدمنا faShieldHalved هنا */}
           <FontAwesomeIcon icon={faShieldHalved} className="size-6" />
        </div>
        <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
          New <span className="text-[#0AAD0A]">Identity</span>
        </h3>
        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium leading-relaxed">
          Almost there! Choose a sophisticated password to secure your FreshCart account.
        </p>
      </div>

      <div className="space-y-5">
        
        {/* 2. Target Account (Read Only) */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] ml-2">
            Target Account
          </label>
          <input 
            type="text" 
            value={email} 
            disabled 
            className="w-full px-6 py-4 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-[#0f0f0f] text-gray-400 dark:text-gray-600 font-bold text-sm cursor-not-allowed outline-none italic"
          />
        </div>

        {/* 3. Password Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] ml-2">
            Secure Password
          </label>
          <div className="relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0AAD0A] transition-colors">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input 
              type={showPass ? "text" : "password"} 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-14 pr-14 py-4 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111] dark:text-white outline-none focus:ring-4 focus:ring-[#0AAD0A]/5 focus:border-[#0AAD0A] transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700 shadow-sm"
            />
            <button 
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#0AAD0A] transition-colors"
            >
              <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
            </button>
          </div>

          {/* Strength Indicator */}
          <div className="flex gap-1.5 px-2 pt-1">
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  strength >= s 
                    ? (strength === 1 ? 'bg-red-400' : strength === 2 ? 'bg-orange-400' : 'bg-[#0AAD0A]') 
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 4. Action Button */}
        <button 
          onClick={() => onComplete(newPassword)}
          disabled={newPassword.length < 6}
          className="w-full py-5 bg-[#0AAD0A] hover:bg-[#099609] text-white font-black text-xs uppercase tracking-[0.2em] rounded-[1.5rem] shadow-2xl shadow-green-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
        >
          Update Credentials
        </button>
      </div>
    </div>
  );
}