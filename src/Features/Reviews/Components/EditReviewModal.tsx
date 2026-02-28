"use client";
import React, { useState } from "react";
import RatingStars from "./RatingStars";
import { UpdateReview } from "../server/Reviews.actions";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Check, Loader2, X } from "lucide-react";

interface EditModalProps {
  review: any;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

export default function EditReviewModal({ review, onClose, onUpdateSuccess }: EditModalProps) {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.review);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (comment.length < 3) return toast.warn("Please write a valid review");
    
    setLoading(true);
    const res = await UpdateReview(review._id, { rating, review: comment });
    setLoading(false);

    if (res.success) {
      toast.success("Updated successfully!");
      onUpdateSuccess(); // عشان نحدث القائمة في الكومبوننت الأب
      onClose(); // نقفل المودال
    } else {
      toast.error(res.message);
    }
  }
return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* الـ Overlay بلمسة Blur ناعمة */}
      <div 
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      {/* محتوى المودال */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-[3rem] p-8 md:p-12 w-full max-w-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-none relative z-10 animate-in zoom-in-95 duration-300 border border-gray-100 dark:border-gray-800">
        
        {/* زرار الإغلاق */}
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        <div className="mb-10">
          <h3 className="text-3xl font-black text-[#0f172a] dark:text-white tracking-tight">
            Edit Feedback
          </h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm font-medium mt-2">
            Your review helps us and others shop better.
          </p>
        </div>
        
        <div className="space-y-8">
          {/* قسم النجوم */}
          <div className="bg-gray-50 dark:bg-[#252525] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 transition-colors">
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 ml-1">
              Overall Rating
            </p>
            <div className="flex justify-center py-2 bg-white dark:bg-[#111] rounded-2xl border border-gray-100 dark:border-gray-800">
              <RatingStars onSelectRating={(val: number) => setRating(val)} />
            </div>
          </div>
          
          {/* قسم الرسالة */}
          <div className="space-y-3">
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">
              Your Message
            </p>
            <div className="relative group">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about the product..."
                className="w-full p-6 bg-gray-50 dark:bg-[#252525] border-2 border-transparent focus:border-green-500 dark:focus:border-green-500/50 rounded-[2rem] outline-none focus:bg-white dark:focus:bg-[#111] transition-all text-gray-700 dark:text-gray-200 font-medium shadow-inner resize-none"
                rows={5}
              />
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              onClick={handleUpdate}
              disabled={loading}
              className="flex-[2] bg-green-600 hover:bg-green-700 text-white font-black text-sm uppercase tracking-widest py-5 rounded-2xl transition-all active:scale-95 shadow-xl shadow-green-500/20 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Check size={20} strokeWidth={3} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-100 dark:bg-[#252525] text-gray-500 dark:text-gray-400 font-black text-sm uppercase tracking-widest py-5 rounded-2xl hover:bg-gray-200 dark:hover:bg-[#333] transition-all active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}