"use client";
import { motion, Variants } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "../Types/tyep.prodects";

// تحديد الـ Type للـ variants عشان TypeScript يسكت
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3  xl:grid-cols-4 gap-4"
    >
      {products.map((item) => (
       
        <motion.div key={String(item._id)} variants={itemVariants}>
          <ProductCard info={item} />
        </motion.div>
      ))}
    </motion.div>
  );
}
