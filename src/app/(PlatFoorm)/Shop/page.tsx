import ProductSidebar from "@/Features/Products/Components/ProductSidebar";
import ProductGrid from "@/Features/Products/Components/ProductGrid";
import getAllProduct, {
  getBrands,
  getCategories,
} from "@/Features/Products/Server/ServerProduct.actions";
import { ShoppingBag, LayoutGrid, SlidersHorizontal } from "lucide-react";


export const metadata = {
  title: 'Shop', 
};

export default async function ShopScreen({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const params = await searchParams;
  const filters = {
    keyword: params.keyword || "",
    price: params.price || params["price[lte]"] || "",
    category: params.category || "",
    brand: params.brand || "",
  };

  const [productsResponse, brandsData, categoriesData] = await Promise.all([
    getAllProduct(filters),
    getBrands(),
    getCategories(),
  ]);

  const products = productsResponse?.data || [];
  const brands = brandsData?.data || brandsData || [];
  const categories = categoriesData?.data || categoriesData || [];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      
      {/* 1. Dynamic Header - Premium Look */}
      <header className="relative bg-[#0f172a] dark:bg-[#050505] pt-24 pb-36 px-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-green-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="size-20 bg-white/5 backdrop-blur-2xl rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl text-green-500 transition-transform hover:rotate-6">
                <ShoppingBag size={38} strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                  Market<span className="text-green-500">place</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1 w-8 bg-green-500 rounded-full" />
                  <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">
                    {products.length} Curated Items
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats/Breadcrumbs - Optional Premium Touch */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Status</p>
                <p className="text-white text-sm font-bold">All Systems Active</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Content Grid */}
      <div className="container mx-auto px-6 -mt-16 pb-20 relative z-20">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          
          {/* Sidebar - Enhanced sticky & design */}
          <aside className="lg:col-span-3">
            <div className="bg-white dark:bg-[#111] rounded-[2.5rem] shadow-2xl shadow-black/5 p-8 sticky top-10 border border-gray-100 dark:border-gray-900 transition-all">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50 dark:border-gray-800">
                <SlidersHorizontal size={18} className="text-green-600" />
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Filters</h2>
              </div>
              <ProductSidebar brands={brands} categories={categories} />
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            <div className="mb-8 flex items-center justify-between bg-white dark:bg-[#111] p-4 rounded-3xl border border-gray-50 dark:border-gray-900 shadow-sm">
               <div className="flex items-center gap-3 pl-2">
                  <LayoutGrid size={16} className="text-gray-400" />
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Default Sorting</span>
               </div>
               {/* هنا ممكن تضيف زرار Toggle لعرض المنتجات كقائمة أو شبكة */}
            </div>

            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="bg-white dark:bg-[#0f0f0f] rounded-[3.5rem] p-32 text-center border-2 border-dashed border-gray-100 dark:border-gray-900 relative overflow-hidden transition-all">
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
                  <h1 className="text-[12rem] font-black uppercase tracking-tighter">Empty</h1>
                </div>
                
                <div className="relative z-10">
                  <div className="size-20 bg-gray-50 dark:bg-[#1a1a1a] rounded-3xl mx-auto mb-6 flex items-center justify-center text-gray-300 dark:text-gray-700">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">No items found</h3>
                  <p className="text-gray-400 mt-2 font-medium max-w-xs mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}