"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Brand } from "../types/brand.type";
import Link from "next/link";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

interface Props {
  brand: Brand;
  index: number;
}

export function BrandCard({ brand, index }: Props) {
  const imageSrc = brand.image || "/placeholder.png";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      custom={index}
      viewport={{ once: true }}
      className="group bg-white p-6 rounded-[2rem] border border-gray-100 hover:shadow-2xl transition-all"
    >
      {/* الـ Link يغلف الكارت كله أو الصورة بس حسب رغبتك */}
      <Link href={`/Brands/${brand._id}`} className="block">
        <div className="aspect-square relative flex items-center justify-center cursor-pointer">
          <Image
            src={imageSrc}
            alt={brand.name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <p className="text-center mt-4 font-bold text-gray-700">
          {brand.name}
        </p>
      </Link>
    </motion.div>
  );
}