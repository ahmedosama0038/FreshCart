"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import SignupHero from "../Components/Signup/SignupHero";
import SignupForm from "../Components/Signup/SignupForm";
import { zodResolver } from '@hookform/resolvers/zod';
import SignupFormValues, { SignupSchema } from "../Schemas/Signup.Scheme"; // تأكد من تصدير الـ Type من ملف الـ Schema

export default function SignupScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignupFormValues>({
    mode: "onChange",
    resolver: zodResolver(SignupSchema), // التصحيح هنا: كلمة resolver بدل zodResolver
  });

  // شلنا الـ any واستخدمنا الـ Type المظبوط
  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    console.log("Valid Data:", data);
  };

  return (
    // ضفنا min-h-screen و flex عشان التصميم يظبط في نص الشاشة
    <div className="min-h-screen flex items-center bg-white dark:bg-[#050505]">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4">
        
        <SignupHero />

        <div className="flex justify-center lg:justify-start">
          <SignupForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            passwordValue={watch("password") || ""}
          />
        </div>
      </div>
    </div>
  );
}