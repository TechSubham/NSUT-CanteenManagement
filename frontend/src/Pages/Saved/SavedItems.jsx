import React from "react";
import { useCart } from "@/contexts/CartContext";  
import FooterIcons from "../FooterIcons/FooterIcons";
import ItemList from "./ItemList";

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
        <ItemList
          items={savedItems}
          removeItem={removeFromSavedItems}
          itemType="saved items"
        />
      </div>
      <FooterIcons/>
    </div>
    
  );
};

export default SavedItems;
