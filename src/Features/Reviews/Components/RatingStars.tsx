import { faStar as faStarregular } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

// أضفنا تعريف الـ Props هنا (اللاسلكي)
interface RatingStarsProps {
  onSelectRating: (val: number) => void;
}

export default function RatingStars({ onSelectRating }: RatingStarsProps) {
  const [rating, setRating] = useState(0);

  const handleRating = (star: number) => {
    setRating(star);       // عشان النجوم تنور قدام اليوزر
    onSelectRating(star);  // عشان نبعت الرقم لصفحة المنتج (الأب)
  };

  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRating(star)} 
          className="transition-transform duration-150 active:scale-90"
        >
          <FontAwesomeIcon
            icon={star <= rating ? faStar : faStarregular}
            className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          />
        </button>
      ))}
      {rating > 0 && (
        <p className="ml-3 text-sm text-gray-500 font-bold animate-pulse">
          ({rating} / 5)
        </p>
      )}
    </div>
  );
}