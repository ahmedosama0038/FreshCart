"use client";
import React, { useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faStar,
  faTruckFast,
  faCheckCircle,
  faTrashCan,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../Types/tyep.prodects";
import {
  CreateReview,
  DeleteReview,
  GetReviewsForProduct,
} from "@/Features/Reviews/server/Reviews.actions";
import RatingStars from "@/Features/Reviews/Components/RatingStars";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import EditReviewModal from "@/Features/Reviews/Components/EditReviewModal";

export default function ProductDetailsTabs({ product }: { product: Product }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewsList, setReviewsList] = useState<any[]>([]); // المخزن الحقيقي للكومنتات
  const [loading, setLoading] = useState(false);
  const [fetchingReviews, setFetchingReviews] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const dynamicStats = useMemo(() => {
    const avg = product.ratingsAverage || 0;
    return [
      { stars: 5, percentage: avg >= 4.5 ? 75 : avg >= 4 ? 60 : 40 },
      { stars: 4, percentage: avg >= 4 ? 25 : 30 },
      { stars: 3, percentage: 10 },
      { stars: 2, percentage: 5 },
      { stars: 1, percentage: 2 },
    ];
  }, [product.ratingsAverage]);

  // --- 2. جلب المراجعات من السيرفر ---
  async function fetchReviews() {
    setFetchingReviews(true);
    const res = await GetReviewsForProduct(product._id);

    console.log("البيانات الكاملة:", res);

    if (res && res.success) {
      // التعديل هنا يا بطل:
      // بنكتب res.data.data لأن السيرفر باعت الـ Array جوه داتا تانية
      setReviewsList(res.data.data || []);
    }
    setFetchingReviews(false);
  }

  // نطلب الداتا أول ما نفتح التاب
  useEffect(() => {
    if (activeTab === "reviews") {
      fetchReviews();
    }
  }, [activeTab]);
  // --- 3. إرسال مراجعة جديدة ---
  async function handleReviewSubmit() {
    if (rating === 0) {
      toast.warn("Please select a star rating first");
      return;
    }
    if (!comment.trim() || comment.length < 3) {
      toast.warn("Please write a meaningful review");
      return;
    }

    setLoading(true);
    const res = await CreateReview(product._id, { rating, comment });
    setLoading(false);

    if (res.success) {
      toast.success("Thank you! Your review has been added.");
      setRating(0);
      setComment("");
      fetchReviews(); 
      router.refresh(); 
    } else {
      toast.error(res.message || "Failed to submit review. Try again.");
    }
  }

  async function handleDelete(reviewId: string) {
    if (!confirm("Are you sure you want to delete this review?")) return;

    const res = await DeleteReview(reviewId);

    if (res.success) {
      toast.success("Review deleted successfully");

      fetchReviews();
      router.refresh();
    } else {
     
      toast.error(res.message);
    }
  }
return (
  <div className="mt-12 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden bg-white dark:bg-[#1a1a1a] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-colors duration-500">
    {/* --- Tabs Header --- */}
    <div className="flex bg-gray-50/50 dark:bg-black/20 border-b border-gray-100 dark:border-gray-800 overflow-x-auto scrollbar-hide">
      {[
        { id: "details", label: "Product Details", icon: faBookOpen },
        { id: "reviews", label: `Reviews (${product.ratingsQuantity})`, icon: faStar },
        { id: "shipping", label: "Shipping & Returns", icon: faTruckFast },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-8 py-5 text-sm font-bold relative min-w-fit transition-all ${
            activeTab === tab.id
              ? "text-green-600 dark:text-green-400 bg-white dark:bg-[#1a1a1a] shadow-sm"
              : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          }`}
        >
          <FontAwesomeIcon
            icon={tab.icon}
            className={`text-xs ${activeTab === tab.id ? "text-green-500" : "text-gray-300 dark:text-gray-700"}`}
          />
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-green-500 rounded-full" />
          )}
        </button>
      ))}
    </div>

    <div className="p-6 md:p-10">
      {/* --- Details Tab --- */}
      {activeTab === "details" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-green-500 rounded-full inline-block"></span>
            Product Description
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-4xl">
            {product.description}
          </p>
        </div>
      )}

      {/* --- Reviews Tab --- */}
      {activeTab === "reviews" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Rating Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
            <div className="lg:col-span-4 text-center p-8 bg-green-50/30 dark:bg-green-500/5 rounded-3xl border border-green-100/50 dark:border-green-500/10">
              <p className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-widest mb-2">Overall Rating</p>
              <div className="text-7xl font-black text-gray-900 dark:text-white mb-2">{product.ratingsAverage}</div>
              <div className="flex text-yellow-400 text-lg mb-3 justify-center">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className={i < Math.floor(product.ratingsAverage) ? "" : "text-gray-200 dark:text-gray-800"} />
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500 font-medium">Based on {product.ratingsQuantity} Reviews</p>
            </div>

            <div className="lg:col-span-8 w-full space-y-4 pt-4">
              {dynamicStats.map((stat) => (
                <div key={stat.stars} className="flex items-center gap-6">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 w-12">{stat.stars} Stars</span>
                  <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full transition-all duration-1000" style={{ width: `${stat.percentage}%` }} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 w-10 text-right">{stat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Form */}
          <div className="bg-white dark:bg-[#222] rounded-[2rem] p-6 md:p-10 border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-none mb-16">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Share Your Experience</h3>
            <div className="grid gap-8">
              <div className="space-y-3">
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> Rate satisfaction
                </p>
                <RatingStars onSelectRating={(val: number) => setRating(val)} />
              </div>
              <div className="space-y-3">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full p-5 bg-gray-50 dark:bg-[#1a1a1a] border-none rounded-2xl focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-gray-700 dark:text-gray-200"
                  placeholder="Tell us what you loved..."
                />
              </div>
              <button
                onClick={handleReviewSubmit}
                disabled={loading}
                className="bg-green-600 text-white font-black text-sm uppercase tracking-widest py-5 px-12 rounded-2xl transition-all shadow-xl shadow-green-200 dark:shadow-none hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Submit Feedback"}
              </button>
            </div>
          </div>

          {/* Customer Stories */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3 border-b dark:border-gray-800 pb-4">
              Customer Stories
              <span className="text-sm font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                {reviewsList.length}
              </span>
            </h3>

            {fetchingReviews ? (
              <div className="text-center py-10 animate-pulse text-gray-400">Loading Community Reviews...</div>
            ) : reviewsList.length > 0 ? (
              <div className="grid gap-6">
                {reviewsList.map((rev: any) => (
                  <div key={rev._id} className="p-6 md:p-8 border border-gray-50 dark:border-gray-800 rounded-[2rem] bg-white dark:bg-[#1a1a1a] shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                          {rev.user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 dark:text-gray-200">{rev.user?.name || "Verified Buyer"}</h4>
                          <div className="flex text-yellow-400 text-[10px] mt-1">
                            {[...Array(5)].map((_, i) => (
                              <FontAwesomeIcon key={i} icon={faStar} className={i < rev.rating ? "" : "text-gray-200 dark:text-gray-800"} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-400 font-bold mr-2">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </span>
                        <button onClick={() => setSelectedReview(rev)} className="text-blue-500 hover:text-blue-700 p-2"><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => handleDelete(rev._id)} className="text-red-400 hover:text-red-600 p-2"><FontAwesomeIcon icon={faTrashCan} /></button>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed md:pl-16 italic text-sm">"{rev.review}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 dark:bg-black/20 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
                <p className="text-gray-400 italic text-lg">No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Shipping Tab --- */}
      {activeTab === "shipping" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="p-8 bg-blue-50/30 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 rounded-3xl">
            <h4 className="font-bold text-blue-900 dark:text-blue-400 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faTruckFast} /> Express Shipping
            </h4>
            <p className="text-blue-700/70 dark:text-blue-300/60 text-sm leading-relaxed">
              Reliable delivery within 3-5 business days. Your satisfaction is our priority.
            </p>
          </div>
        </div>
      )}
    </div>

    {selectedReview && (
      <EditReviewModal 
        review={selectedReview} 
        onClose={() => setSelectedReview(null)} 
        onUpdateSuccess={() => { fetchReviews(); router.refresh(); }} 
      />
    )}
  </div>
);
}
