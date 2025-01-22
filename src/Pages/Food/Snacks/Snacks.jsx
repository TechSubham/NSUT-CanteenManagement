import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useCart } from "../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import { getAuth } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Snacks = () => {
  const auth = getAuth();
  const [snacks, setSnacks] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    totalItems,
    totalAmount,
    savedItems,
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnacks = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('No authenticated user');
        }

        const token = await currentUser.getIdToken();
        const response = await fetch(`https://nsutcanteenbackend.onrender.com/snacks`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSnacks(data.snacks);
        setFavourites(data.favouriteList);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching snacks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnacks();
  }, [auth]);

  const isItemSaved = (itemId) => {
    return savedItems.some(item => item.id === itemId);
  };

  const filteredSnacks = snacks.filter((snack) =>
    snack.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
        <div className="loader border-t-4 border-b-4 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>
        <div className="text-lg text-gray-500 mt-4">Loading snacks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-20">
      <div className="mt-2 ml-4 relative w-[95%]">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <Input
          className="rounded-xl w-full pl-10"
          placeholder="Search snacks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mt-4 space-y-4">
        {filteredSnacks.map((snack) => {
          const favourite = favourites.includes(snack.id);
          return (
            <MenuItem
              key={snack.id}
              id={snack.id}
              image_url={snack.image_url}
              name={snack.name}
              selling_price={snack.selling_price}
              availability={snack.availability}
              favourite={favourite}
              item_type="snack"
            />
          );
        })}
      </div>

      {totalItems > 0 && (
        <div>
          <div className="m-2 rounded-2xl fixed bottom-0 left-0 right-0 bg-green-500 text-white p-4 z-20">
            <div className="h-9 max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <span className="text-lg font-bold">{totalItems} items</span>
                <span className="mx-2">|</span>
                <span className="text-lg font-bold">₹{totalAmount}</span>
              </div>
              <div
                onClick={() => navigate("/cart")}
                className="bg-green-500 text-white hover:bg-gray-100 mr-5 font-bold text-xl cursor-pointer"
              >
                View Cart
                <FontAwesomeIcon icon={faCartShopping} className="ml-2" />
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white h-16 z-10"></div>
        </div>
      )}
    </div>
  );
};

export default Snacks;