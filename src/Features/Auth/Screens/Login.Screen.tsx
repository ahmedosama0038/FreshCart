import LoginForm from "../Components/Login/Login.Form";
import LoginHero from "../Components/Login/LoginHero";

export default function LoginScreen() {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-[#050505] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden transition-colors duration-500">
      
      {/* 1. الخلفية التزيينية (Ambient Background) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0AAD0A]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* 2. الحاوية الرئيسية (Main Container) */}
      <div className="container max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center xl:justify-between gap-16 lg:gap-24">
          
          {/* قسم الـ Hero - يظهر بـ Slide من الشمال */}
          <div className="hidden lg:block w-full lg:w-1/2 animate-in fade-in slide-in-from-left-12 duration-1000 ease-out">
            <LoginHero />
          </div>

          {/* قسم الـ Form - يظهر بـ Slide من اليمين أو زووم في الموبايل */}
          <div className="w-full lg:w-auto flex justify-center animate-in fade-in slide-in-from-right-12 lg:slide-in-from-right-20 duration-1000 ease-out">
            <LoginForm />
          </div>

        </div>
      </div>

      {/* 3. التوقيع السفلي (Minimalist Footer) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 dark:text-gray-800 select-none">
          FreshCart Digital Experience • 2026
        </p>
      </div>
    </div>
  );
}