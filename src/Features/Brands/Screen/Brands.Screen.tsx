// src/app/(PlatFoorm)/Brands/page.tsx

import BrandGrid from "../Components/BrandGrid";
import BrandHeader from "../Components/BrandHeader";
import { GetAllBrands } from "../Server/Brands.actions";

// src/app/(PlatFoorm)/Brands/page.tsx
export default async function BrandsPage() {
  const brandsResponse = await GetAllBrands();
  
  // 1. افتح التيرمنال وشوف دي هتطبع إيه
  console.log("Full API Response:", brandsResponse);

  // 2. التأكد من مكان الداتا (جرب دي لو التانية منجحتش)
  const brands = brandsResponse?.data || brandsResponse || [];

  return (
   <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] transition-colors duration-500">
      <BrandHeader total={brands.length} />
      <main className="container mx-auto px-6 pb-20">
        {/* لو brands طولها 0، الـ Console هيعرفنا ليه */}
        <BrandGrid brands={brands} /> 
      </main>
    </div>
  );
}