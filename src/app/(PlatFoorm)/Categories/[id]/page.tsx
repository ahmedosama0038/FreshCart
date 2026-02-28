// src/app/(PlatFoorm)/Categories/[id]/page.tsx
import { 
  Getspecificcategory, 
  GetAllSubCategoriesOnCategory, 
  GetProductsByCategory 
} from "@/Features/Category/Server/Server.Actions";
import CategoryDetailsView from "../CategoryDetailsView";


// السيرفر كومبوننت يجب أن يكون async ولا يحتوي على "use client"
export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

 
  const [category, subCategories, products] = await Promise.all([
    Getspecificcategory(id),
    GetAllSubCategoriesOnCategory(id),
    GetProductsByCategory(id),
  ]);

  // تمرير البيانات للمكون العميل (Client View)
  return (
    <CategoryDetailsView 
      category={category} 
      subCategories={subCategories} 
      products={products} 
    />
  );
}