"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHeadset, faShieldAlt, faTruck, faUndo, 
  faMagic, faLaptop, faUsers, faSmile 
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
export default function PromoBanar() {
  const features = [
    {
      icon: faTruck,
      title: "Free Shipping",
      description: "On orders over 500 EGP",
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      icon: faShieldAlt,
      title: "Secure Payment",
      description: "100% secure",
      color: "text-emerald-500 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      icon: faUndo,
      title: "Easy Returns",
      description: "14-day policy",
      color: "text-orange-500 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-500/10",
    },
    {
      icon: faHeadset,
      title: "24/7 Support",
      description: "Dedicated team",
      color: "text-purple-500 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-500/10",
    },
    
    {
      icon: faMagic,
      title: "Beauty Care",
      description: "Makeup & More",
      color: "text-pink-500 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-500/10",
    },
    {
      icon: faLaptop,
      title: "Tech Hub",
      description: "Smart Gadgets",
      color: "text-cyan-500 dark:text-cyan-400",
      bgColor: "bg-cyan-50 dark:bg-cyan-500/10",
    }
  ];

  // إعدادات الأنيميشن (Stagger Effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-12 bg-gray-50/50 dark:bg-[#0f0f0f] transition-colors duration-500">
      <div className="container mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group transition-all hover:shadow-xl dark:hover:shadow-white/5 hover:border-transparent dark:hover:border-gray-700"
            >
              {/* أيقونة بحركة نبض خفيفة عند الهوفر */}
              <div className={`${feature.bgColor} ${feature.color} size-14 rounded-2xl flex items-center justify-center mb-4 transform transition-transform group-hover:rotate-12`}>
                <FontAwesomeIcon icon={feature.icon} className="text-xl" />
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm whitespace-nowrap transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}