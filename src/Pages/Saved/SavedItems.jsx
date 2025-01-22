import React, { useEffect, useState } from "react";
import FooterIcons from "../FooterIcons/FooterIcons";
import ItemList from "./ItemList";
import axios from "axios";
import { getAuth } from "firebase/auth";

const SavedItems = () => {
  const currentUser = getAuth().currentUser;
  const [savedItems, setSavedItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getFavourites() {
      if (!currentUser) {
        setError("Please log in to view saved items");
        setIsLoading(false);
        return;
      }

      try {
        const token = await currentUser.getIdToken();
        const response = await axios.get(`https://nsutcanteenbackend.onrender.com/favourites`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setSavedItems(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError(err.response?.data?.error || "Failed to load saved items");
      } finally {
        setIsLoading(false);
      }
    }

    getFavourites();
  }, [currentUser]);

  // Function to handle save/unsave
  const handleSaveToggle = async (itemId) => {
    if (!currentUser) {
      setError("Please log in to save items");
      return;
    }

    try {
      const token = await currentUser.getIdToken();
      const response = await axios.post(
        `https://nsutcanteenbackend.onrender.com/favourites/toggle`,
        { itemId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      // Update the local state based on the response
      setSavedItems(prevItems => {
        const isItemSaved = prevItems.some(item => item.id === itemId);
        if (isItemSaved) {
          return prevItems.filter(item => item.id !== itemId);
        } else {
          // Add the new item to the list
          const newItem = response.data.item;
          return [...prevItems, newItem];
        }
      });
    } catch (err) {
      console.error("Error toggling favorite:", err);
      setError("Failed to update saved item");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="px-4 py-2 text-red-600 text-center">{error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-xl font-semibold">SAVED ITEMS</h2>
          <div className="flex-1 ml-4">
            <div className="h-0.5 bg-gradient-to-r from-slate-400 to-transparent" />
          </div>
        </div>
        {savedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-8">
            <p className="text-gray-500 text-center">No saved items found</p>
          </div>
        ) : (
          <ItemList 
            items={savedItems} 
            itemType="saved items" 
            onSaveToggle={handleSaveToggle}
          />
        )}
      </div>
      <FooterIcons />
    </div>
  );
};

export default SavedItems;