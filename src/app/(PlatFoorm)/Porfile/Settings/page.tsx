"use client";
import ErrorMessage from "@/Features/Auth/Components/Error/ErrorMessage";
import { updateUserName } from "@/Features/Auth/Store/Auth.Slice";
import ChangePassword from "@/Features/Profile/Components/ChangePassword";
import {
  SchemaSettingsValues,
  SettingsSchema,
} from "@/Features/Profile/Schema/profile.schema";
import { UpdateLoggeduserdata } from "@/Features/Profile/Server/profile.action";
import { useAppDaspatch, useAppSelector } from "@/Store/Store";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Save,
  ShieldCheck,
  Home,
  ChevronRight,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// export const metadata = {
//   title: 'Settings', 
// };
export default function SettingsPage() {
  const dispatch =  useAppDaspatch()
  const {userInfo }=  useAppSelector((stat)=>stat.auth)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    defaultValues: {
      name: userInfo?.name||"",
      email: userInfo?.email||"",
      phone: userInfo?.phone||"",
    },
    resolver: zodResolver(SettingsSchema),
    reValidateMode: "onChange",
  });

 

  const onSubmit = async (valus: SchemaSettingsValues) => {
    try {
      const res = await UpdateLoggeduserdata(valus);
      if (res.message === "success") {
        toast.success("Profile updated successfully! ✅");
        reset(valus);
       dispatch(updateUserName(valus.name));
      }
    } catch (error) {
      toast.error("Something went wrong! ❌");
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* ================= NEW HEADER ================= */}
        <div className="relative overflow-hidden bg-white dark:bg-[#1a1a1a] border-b border-gray-100 dark:border-gray-800 mb-8 rounded-[2.5rem] mt-4 shadow-sm transition-colors">
          {/* شكل ديكوري في الخلفية */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/50 dark:bg-green-900/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-100/40 dark:bg-orange-900/10 rounded-full -ml-12 -mb-12 blur-2xl"></div>

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Icon Wrapper */}
              <div className="size-16 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-2xl flex items-center justify-center shadow-lg shadow-green-100 dark:shadow-none text-white">
                <ShieldCheck size={32} />
              </div>

              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                  <Home size={10} />
                  <span>Dashboard</span>
                  <ChevronRight size={10} />
                  <span className="text-green-600 dark:text-green-500">Settings</span>
                </div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  Account{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
                    Settings
                  </span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">
                  Manage your presence and security settings
                </p>
              </div>
            </div>

            {/* Quick Stats or Status */}
            <div className="hidden lg:flex items-center gap-4 bg-gray-50 dark:bg-[#252525] p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                  Security Level
                </p>
                <p className="text-sm font-black text-green-600 dark:text-green-400">Strong</p>
              </div>
              <div className="size-10 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                <ShieldCheck size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Profile Information */}
        <section className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-2xl">
                <User size={24} />
              </div>
              <div>
                <h2 className="font-bold text-gray-800 dark:text-gray-100">Profile Information</h2>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Update your personal details
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Ahmed Osama"
                    className="w-full px-5 py-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#252525] dark:text-white focus:bg-white dark:focus:bg-[#1f1f1f] focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    {...register("name")}
                  />
                  {errors.name && <ErrorMessage message={errors.name.message} />}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-5 py-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#252525] dark:text-white focus:bg-white dark:focus:bg-[#1f1f1f] focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    {...register("email")}
                  />
                  {errors.email && <ErrorMessage message={errors.email.message} />}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    className="w-full px-5 py-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#252525] dark:text-white focus:bg-white dark:focus:bg-[#1f1f1f] focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    {...register("phone")}
                  />
                  {errors.phone && <ErrorMessage message={errors.phone.message} />}
                </div>
              </div>

              <button
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-[#22c55e] text-white font-bold rounded-xl hover:bg-[#1bad52] transition-all shadow-lg shadow-green-100 dark:shadow-none active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Save size={18} />
                )}
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Account Info (Read-only) */}
          <div className="bg-gray-50/50 dark:bg-[#1f1f1f]/50 p-8 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4">
              Account Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 dark:text-gray-400">User ID</span>
                <span className="font-mono text-gray-400 dark:text-gray-500">---</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 dark:text-gray-400">Role</span>
                <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-bold">
                  User
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Change Password */}
        <section className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 p-8 transition-colors">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-2xl">
              <Lock size={24} />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 dark:text-gray-100">Change Password</h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Update your account password
              </p>
            </div>
          </div>

          {/* هنا لازم تروح تظبط الـ ChangePassword component برضه عشان يقبل الدارك مود */}
          <ChangePassword />
        </section>
      </div>
    </main>
  );
}
