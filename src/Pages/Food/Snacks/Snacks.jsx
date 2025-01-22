import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useCart } from "../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAuth } from "firebase/auth";
import MenuItem from "../components/MenuItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const Snacks = () => {
  const currentUser = getAuth().currentUser
  const [snacks, setSnacks] = useState([]);
  const [favourites, setFavourites] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalAmount,
    savedItems,
    toggleSaveItem
  } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSnacks = async () => {


      try{
      const token = await currentUser.getIdToken();
      const response = await fetch(`https://nsutcanteenbackend.onrender.com/snacks`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch snacks");
      }
      const data = await response.json();
      setSnacks(data.snacks);
      setFavourites(data.favouriteList)
      console.log(data.favouriteList)

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnacks();
  }, []);



  const filteredSnacks = snacks.filter((snack) =>
    snack.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
        {/* Circular Loader */}
        <div className="loader border-t-4 border-b-4 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>

        {/* Loading Text */}
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
        {/* Magnifying Glass Icon */}
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        {/* Input Field */}
        <Input
          className="rounded-xl w-full pl-10"
          placeholder="Search snacks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mt-4 space-y-4">
        {filteredSnacks.map((snack) => {
          let favourite = false;
          if (favourites.includes(snack.id)) {
            favourite = true;
          }
          return (
            <MenuItem key={snack.id} id={snack.id} image_url={snack.image_url} name={snack.name}
              selling_price={snack.selling_price} rating={snack.rating} description={snack.description}
              availability={snack.availability} favourite item_type="snack" />)
        })}
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <span className="font-bold">{totalItems} items</span>
              <span className="mx-2">|</span>
              <span className="font-bold">₹{totalAmount}</span>
            </div>
            <Button
              onClick={() => navigate("/cart")}
              className="bg-white text-green-500 hover:bg-gray-100"
            >
              View Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Snacks;
