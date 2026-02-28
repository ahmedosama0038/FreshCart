import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast, faRotateLeft, faShieldHalved, faHeadset } from '@fortawesome/free-solid-svg-icons';

const FeaturesBar = () => {
  const features = [
    {
      icon: faTruckFast,
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
    },
    {
      icon: faRotateLeft,
      title: "Easy Returns",
      desc: "14-day return policy",
    },
    {
      icon: faShieldHalved,
      title: "Secure Payment",
      desc: "100% secure checkout",
    },
    {
      icon: faHeadset,
      title: "24/7 Support",
      desc: "Contact us anytime",
    },
  ];
return (
    <section className="w-full py-10 bg-[#f8fcf9] dark:bg-[#0f0f0f] transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-[#1a1a1a] hover:shadow-md dark:hover:shadow-green-500/5 group"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 shrink-0 bg-[#e3f1e9] dark:bg-[#1e2923] rounded-xl flex items-center justify-center text-[#3bb77e] dark:text-[#4ade80] group-hover:bg-[#3bb77e] dark:group-hover:bg-[#22c55e] group-hover:text-white transition-colors duration-300">
                <FontAwesomeIcon icon={item.icon} className="text-xl" />
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <h4 className="text-[#253d4e] dark:text-gray-100 font-bold text-[15px] md:text-lg leading-tight transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-400 dark:text-gray-500 text-xs md:text-sm mt-1 font-medium transition-colors">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;