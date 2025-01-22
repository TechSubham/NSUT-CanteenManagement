
import React, { useEffect,useState } from "react"; 
import FooterIcons from "../FooterIcons/FooterIcons";
import ItemList from "./ItemList";
import axios from "axios";
import { getAuth } from "firebase/auth";

const SavedItems = () => {
  const currentUser = getAuth().currentUser;
  const [savedItems, setSavedItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getFavourites() {
      // Check if user is logged in
      if (!currentUser) {
        setError("Please log in to view saved items");
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
      }
    }

    getFavourites();
  }, [currentUser]);

  if (error) {
    return <div className="px-4 py-2 text-red-600">{error}</div>;
  }

  return (
    <div className="pb-20">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-xl">SAVED ITEMS</h2>
          <div className="flex-1 ml-4">
            <div className="h-0.5 bg-gradient-to-r from-slate-400 to-transparent" />
          </div>
        </div>
        {savedItems.length === 0 ? (
          <p className="text-gray-500 mt-4">No saved items found</p>
        ) : (
          <ItemList items={savedItems} itemType="saved items" />
        )}
      </div>
      <FooterIcons/>
    </div>
  );
};

export default SavedItems;

