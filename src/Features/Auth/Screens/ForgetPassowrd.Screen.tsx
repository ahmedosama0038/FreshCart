"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faShieldAlt,
  faLock,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import StepOTP from "../Components/ForgetPassowrd/StepOTP";
import StepEmail from "../Components/ForgetPassowrd/StepEmail";
import {
  ForgotPasswordAction,
  ResetPasswordAction,
  VerifyResetCode,
} from "../Server/Passowrd.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import StepResetPassword from "../Components/ForgetPassowrd/ResetPassword";
import Link from "next/link";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");

  const handleEmailSubmit = async (emailFromStep: string) => {
    const res = await ForgotPasswordAction(emailFromStep);
    setUserEmail(emailFromStep);
    if (res.success) {
      toast.success("Done! Check your email");
      setStep(2);
    } else {
      toast.error(res.message);
    }
  };

  const handleVerifyOTP = async (otpFromStep: string) => {
    const res = await VerifyResetCode(otpFromStep);
    if (res.success) {
      toast.success("Code is Correct! Set your new password.");
      setStep(3);
    } else {
      toast.error(res.message || "Invalid Code");
    }
  };

  const handleResetPassword = async (newPassword: string) => {
    const res = await ResetPasswordAction({
      email: userEmail,
      newPassword: newPassword,
    });
    if (res.success) {
      toast.success("Password reset successful! Redirecting...");
      setTimeout(() => {
        router.push("/Login");
      }, 2000);
    } else {
      toast.error(res.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] flex items-center justify-center p-4 lg:p-10 font-sans transition-colors duration-500">
      <div className="max-w-6xl w-full bg-white dark:bg-[#0f0f0f] rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden min-h-[650px] border border-transparent dark:border-gray-900">
        
        {/* --- الجزء الشمال: Hero (تمت إضافة Dark Mode) --- */}
        <div className="lg:w-1/2 bg-[#F0FDF4] dark:bg-[#0a1a0f] p-12 flex flex-col items-center justify-center text-center space-y-8 relative">
          {/* Progress Indicator Dots */}
          <div className="flex gap-3 absolute top-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-[#22C55E]' : 'w-2 bg-gray-300 dark:bg-gray-700'}`} />
            ))}
          </div>

          <div className="relative w-full max-w-sm aspect-square lg:aspect-video bg-[#D1FAE5]/30 dark:bg-[#22C55E]/5 rounded-[2.5rem] flex items-center justify-center overflow-hidden animate-pulse-slow">
            <div className="flex items-center gap-4 z-10 scale-110 lg:scale-125">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-[#22C55E]">
                <FontAwesomeIcon icon={step > 1 ? faCheckCircle : faEnvelope} />
              </div>
              <div className="w-20 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center text-[#22C55E] text-4xl border-t-4 border-[#22C55E]">
                <FontAwesomeIcon icon={step === 3 ? faCheckCircle : faLock} className={step === 3 ? "animate-bounce" : ""} />
              </div>
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-[#22C55E]">
                <FontAwesomeIcon icon={step === 2 ? faShieldAlt : faShieldAlt} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              {step === 1 ? "Forgot Password?" : step === 2 ? "Verify OTP" : "Secure Reset"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-medium">
              {step === 1 ? "Don't worry, we'll help you get back in no time." : 
               step === 2 ? `We've sent a code to ${userEmail}` : 
               "Choose a strong password to protect your account."}
            </p>
          </div>
        </div>

        {/* --- الجزء اليمين: الـ Form --- */}
        <div className="lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center relative bg-white dark:bg-[#0f0f0f]">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-[#0AAD0A] italic tracking-tighter">
              FreshCart
            </h2>
          </div>

          {/* Form Content with simple transition hint */}
          <div className="animate-in fade-in slide-in-from-right duration-500">
            {step === 1 ? (
              <StepEmail onNext={handleEmailSubmit} />
            ) : step === 2 ? (
              <StepOTP onBack={() => setStep(1)} onNext={handleVerifyOTP} />
            ) : (
              <StepResetPassword
                email={userEmail}
                onComplete={handleResetPassword}
              />
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-500 text-sm font-medium">
              Remember your password?{" "}
              <Link href="/Login" className="text-[#0AAD0A] font-extrabold hover:underline ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}