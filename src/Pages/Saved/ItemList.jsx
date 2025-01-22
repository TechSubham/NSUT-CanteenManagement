import React from 'react';
import { Heart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const MenuItem = ({ 
  id, 
  image_url, 
  name, 
  selling_price, 
  availability, 
  favourite, 
  item_type 
}) => {
  const { toggleSaveItem } = useCart();

  // Enhanced handler for both click and touch events
  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveItem(id);
  };

  return (
    <div className="mx-4 bg-white rounded-xl shadow-sm relative">
      <div className="flex p-2">
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        
        <div className="flex-1 ml-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            {/* Enhanced touch target for the save button */}
            <button
              onClick={handleSaveClick}
              className="p-3 -mr-2 -mt-2 touch-manipulation"
              role="button"
              aria-label={favourite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`w-6 h-6 ${
                  favourite ? 'fill-red-500 stroke-red-500' : 'stroke-gray-400'
                }`}
              />
            </button>
          </div>
          
          <div className="mt-1">
            <span className="font-semibold text-gray-900">₹{selling_price}</span>
          </div>
          
          <div className="mt-1">
            <span className={`text-sm ${
              availability ? 'text-green-600' : 'text-red-600'
            }`}>
              {availability ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;