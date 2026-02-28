"use client";
import { useState } from "react";
import {
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

export default function StepResetPassword({
  email,
  onComplete,
}: {
  email: string;
  onComplete: (pass: string) => Promise<void> | void;
}) {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    await onComplete(newPassword);
    setLoading(false);
  };
return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 ease-out">
      
      {/* 1. Header - تدرج لوني خفيف للنص ليعطي طابعاً عصرياً */}
      <div className="text-center lg:text-left space-y-3">
        <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
          Secure <span className="text-[#0AAD0A]">Vault</span>
        </h3>
        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">
          Create a sophisticated password to protect your assets.
        </p>
      </div>

      <div className="space-y-5">

        {/* 2. Email field - جعله يبدو كـ "معرف" غير قابل للتعديل بشكل أنيق */}
        <div className="relative group">
          <input
            type="text"
            value={email}
            disabled
            className="w-full px-6 py-4 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0f0f0f] text-gray-400 dark:text-gray-600 font-bold text-sm cursor-not-allowed transition-all"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-gray-300 dark:text-gray-700">
            Account ID
          </span>
        </div>

        {/* 3. New password field - إضافة تأثير الـ Focus البريميوم */}
        <div className="relative group">
          <input
            type={showPass ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full px-6 py-4 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111] dark:text-white outline-none focus:ring-4 focus:ring-[#0AAD0A]/10 focus:border-[#0AAD0A] transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700"
          />
          <button
            type="button"   
            onClick={() => setShowPass(!showPass)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0AAD0A] transition-colors"
          >
            <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
          </button>
        </div>

        {/* 4. Confirm password field */}
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="w-full px-6 py-4 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111] dark:text-white outline-none focus:ring-4 focus:ring-[#0AAD0A]/10 focus:border-[#0AAD0A] transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700"
          />
        </div>

        {/* 5. Password Strength Hint (اختياري لكنه بريميوم جداً) */}
        {newPassword && (
          <div className="flex gap-1 px-2">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  newPassword.length > step * 2 ? 'bg-[#0AAD0A]' : 'bg-gray-100 dark:bg-gray-800'
                }`} 
              />
            ))}
          </div>
        )}

        {/* 6. Submit Button - بستايل الـ High-End */}
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full py-5 bg-[#0AAD0A] hover:bg-[#099609] text-white font-black text-xs uppercase tracking-[0.2em] rounded-[1.5rem] shadow-xl shadow-green-500/20 active:scale-[0.98] disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-3 mt-4"
        >
          {loading ? (
            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Update Credentials"
          )}
        </button>

      </div>
    </div>
  );
}
