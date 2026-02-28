"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faSpinner,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginFormValues, { LoginScheme } from "../../Schemas/Login.Scheme";
import ErrorMessage from "../Error/ErrorMessage";
import LoginActions from "../../Server/Login.Actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SetToken } from "../../Server/Auth.actions";
import { setUserInfo } from "../../Store/Auth.Slice";
import { useAppDaspatch } from "@/Store/Store";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDaspatch();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      reMepaer: false,
    },
    resolver: zodResolver(LoginScheme),
  });

  const onSupmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const response = await LoginActions(values);
      if (response?.success) {
        await SetToken(response.data.token, values.reMepaer);
        dispatch(setUserInfo(response.data.user));
        toast.success(response.message);
        router.push("/");
      } else {
        if (response?.erorrs) {
          Object.keys(response.erorrs).forEach((key) => {
            setError(key as keyof LoginFormValues, {
              message: response.erorrs[key as keyof LoginFormValues] as string,
            });
          });
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-[500px] p-8 lg:p-12 space-y-10 bg-white dark:bg-[#0f0f0f] rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-50 dark:border-gray-900 animate-in fade-in zoom-in-95 duration-700">
      
      {/* 1. Header Section */}
      <div className="space-y-3 text-center lg:text-left">
        <h1 className="text-4xl font-black text-[#0AAD0A] tracking-tighter uppercase italic">
          Fresh<span className="text-gray-900 dark:text-white">Cart</span>
        </h1>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          Welcome Back!
        </h2>
        <p className="text-gray-400 dark:text-gray-500 font-medium text-sm">
          Continue your premium shopping experience
        </p>
      </div>

      {/* 2. Social Login */}
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
          Secure Access
        </span>
      </div>

      {/* 3. Login Form */}
      <form onSubmit={handleSubmit(onSupmit)} className="space-y-6">
        
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Email Address
          </label>
          <div className="relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0AAD0A] transition-colors">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-transparent focus:border-[#0AAD0A] dark:text-white outline-none transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700 shadow-inner"
              {...register("email")}
            />
          </div>
          {errors?.email && <ErrorMessage message={errors.email.message} />}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Password
            </label>
          <Link 
  href="/Forget-Password" 
  className="text-[10px] text-[#0AAD0A] font-black uppercase tracking-widest hover:underline decoration-2 transition-colors hover:text-[#099609]"
>
  Lost Password?
</Link>
          </div>
          <div className="relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0AAD0A] transition-colors">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••••••"
              className="w-full pl-14 pr-14 py-5 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-transparent focus:border-[#0AAD0A] dark:text-white outline-none transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700 shadow-inner"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#0AAD0A] transition-colors"
            >
              <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors?.password && <ErrorMessage message={errors.password.message} />}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-3 px-1">
          <input
            type="checkbox"
            id="remember"
            className="accent-[#0AAD0A] size-5 rounded-lg cursor-pointer"
            {...register("reMepaer")}
          />
          <label htmlFor="remember" className="text-xs font-bold text-gray-400 dark:text-gray-500 cursor-pointer select-none">
            Maintain active session
          </label>
        </div>

        {/* Action Button */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-[#0AAD0A] hover:bg-[#099609] text-white py-5 rounded-[1.5rem] flex justify-center items-center gap-4 font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-green-500/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:grayscale disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="text-lg" />
              <span>Verifying Identity...</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faRightToBracket} className="text-lg" />
              <span>Authorize Access</span>
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-gray-50 dark:border-gray-900">
        <p className="text-gray-400 font-medium text-sm">
          New to FreshCart?{" "}
          <Link href="/Signup" className="text-[#0AAD0A] font-black uppercase tracking-tighter hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}