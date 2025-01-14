import React from "react";
import { useCart } from "@/contexts/CartContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"; 
import FooterIcons from "../FooterIcons/FooterIcons";

const SavedItems = () => {
  const { savedItems, removeFromSavedItems } = useCart(); // Use saved items and remove function

  return (
    <div className="pb-20">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-xl">SAVED ITEMS</h2>
          <div className="flex-1 ml-4">
            <div className="h-0.5 bg-gradient-to-r from-slate-400 to-transparent" />
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {savedItems.length > 0 ? (
            savedItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative">
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={item.categoryIcon} alt="Category" className="w-5 h-5 md:w-6 md:h-6" />
                      <h3 className="ml-2 text-lg md:text-xl font-bold">{item.name}</h3>
                    </div>
                    <button
                      onClick={() => removeFromSavedItems(item.id)} 
                      className="text-red-500 hover:text-red-700 transition-colors rounded-full p-2 hover:bg-red-100"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="text-xl" />
                    </button>
                  </div>

                  <p className="font-semibold text-lg mt-1">₹{item.price}</p>
                  <p className="mt-1 text-sm md:text-base text-gray-600">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No saved items</p>
          )}
        </div>
      </div>
      <FooterIcons/>
    </div>
    
  );
};

export default SavedItems;
