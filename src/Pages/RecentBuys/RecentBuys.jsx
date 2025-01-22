import React from "react";
import Coffee from "../../assets/coffee1.avif";
import Veg from "../../assets/Veg.png";
import Star from "../../assets/star.avif";
import FooterIcons from "../FooterIcons/FooterIcons";

import { useCart } from "@/contexts/CartContext";

const recentBuys = [
  {
    id: 56,
    name: 'Coffee',
    price: 30,
    rating: 4.5,
    description: 'Description about the item',
    image: Coffee,
    categoryIcon: Veg,
  },
  {
    id: 58,
    name: 'Tea',
    price: 25,
    rating: 4.2,
    description: 'A refreshing cup of tea',
    image: Coffee,
    categoryIcon: Veg,
  },
  {
    id: 59,
    name: 'Latte',
    price: 40,
    rating: 4.7,
    description: 'Smooth and creamy latte',
    image: Coffee,
    categoryIcon: Veg,
  },
];

const RecentBuys = () => {
  const { savedItems, toggleSaveItem } = useCart();
  const isItemSaved = (itemId) => {
    return savedItems.some(item => item.id === itemId);
  };
  return (
    <div className="pb-20">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl md:text-2xl">RECENT BUYS</h2>
          <div className="flex-1 ml-4">
            <div className="h-0.5 bg-gradient-to-r from-slate-400 to-transparent" />
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {recentBuys.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative">
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={item.categoryIcon} alt="Category" className="w-5 h-5 md:w-6 md:h-6" />
                    <h3 className="ml-2 text-base sm:text-lg md:text-xl font-bold">{item.name}</h3>
                  </div>
                  {/* <button
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => toggleSaveItem(item)}
                  >
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={`text-xl ${isItemSaved(item.id) ? 'text-yellow-500' : 'text-gray-400'}`} 
                    />
                  </button> */}
                </div>
                <p className="font-semibold text-base sm:text-lg md:text-xl mt-1">₹{item.price}</p>
                <div className="flex items-center mt-1">
                  <img src={Star} alt="Rating" className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="ml-1 text-xs sm:text-sm md:text-base">{item.rating}</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterIcons />
    </div>
  );
};

export default RecentBuys;
