import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faShieldHalved, faHeadset } from "@fortawesome/free-solid-svg-icons";
import login from "../../../../assets/Images/2e5810ff3e-e750761ebcd4ae5907db.png";
import Image from "next/image";

export default function LoginHero() {
  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-[#0f0f0f] p-12 lg:p-16 rounded-[3rem] w-full max-w-[620px] transition-all duration-500 relative overflow-hidden group">
      
      {/* 1. الخلفية التزيينية (Decorative Background) - تعطي عمق للتصميم */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/5 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-500/10 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />

      {/* 2. منطقة الصورة مع انيميشن خفيف */}
      <div className="mb-12 w-full max-w-[420px] relative z-10 transition-transform duration-700 group-hover:scale-105">
        <Image
          src={login}
          alt="FreshCart Shopping" 
          className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(10,173,10,0.15)]"
          width={450}
          height={450}
          priority
        />
      </div>

      {/* 3. النصوص بستايل الـ High-End */}
      <div className="text-center space-y-6 relative z-10">
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tighter uppercase italic">
            Quality <span className="text-[#0AAD0A]">Guaranteed</span> 
            <br />
            Every Day.
          </h2>
          <div className="h-1.5 w-12 bg-[#0AAD0A] mx-auto rounded-full mt-2" />
        </div>

        <p className="text-gray-400 dark:text-gray-500 text-base lg:text-lg font-medium max-w-sm mx-auto leading-relaxed italic">
          Join thousands of happy customers who trust <span className="text-gray-900 dark:text-white font-bold">FreshCart</span> for their premium grocery needs.
        </p>
        
        {/* 4. المميزات (Features) بستايل الـ Cards المصغرة */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
          {[
            { icon: faTruck, label: "Free Delivery" },
            { icon: faShieldHalved, label: "Secure Payment" },
            { icon: faHeadset, label: "24/7 Support" }
          ].map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-2.5 px-4 py-2 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-gray-800 text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 shadow-sm"
            >
              <FontAwesomeIcon icon={item.icon} className="text-[#0AAD0A] text-xs" />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}