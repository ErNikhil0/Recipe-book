import { useState } from "react";

const Rating = ({ value = 0, count = 0, userRating = 0, onRate, small = false }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const size = small ? 'w-4 h-4' : 'w-5 h-5';
  
  // Ensure value is treated as a number
  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;
  
  return (
    <div className={`flex items-center ${small ? 'gap-0.5' : 'gap-1'}`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate && onRate(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none"
            disabled={!onRate || userRating > 0}
          >
            <svg
              className={`${size} ${(hoverRating || userRating || numericValue) >= star 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300 fill-current'}`}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </button>
        ))}
      </div>
      {!small && count > 0 && (
        <span className="ml-1 text-gray-700 text-sm">
          ({numericValue.toFixed(1)}) {count} {count === 1 ? 'rating' : 'ratings'}
        </span>
      )}
    </div>
  );
};

export default Rating;

