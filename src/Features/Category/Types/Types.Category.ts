// كل عنصر في data
export  interface Category {
    _id: string;    // رقم التعريف
    name: string;   // الاسم
    slug: string;   // رابط مختصر
    image: string;  // رابط الصورة
}

// معلومات الصفحة
interface Metadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
}

// الداتا كلها
export interface CategoriesResponse {
    results: number;      // عدد النتائج
    metadata: Metadata;   // معلومات الصفحة
    data: Category[];     // الصفوف (الجدول)
}
export  interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}