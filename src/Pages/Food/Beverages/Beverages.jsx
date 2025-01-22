import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

import { useCart } from "../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { getAuth } from "firebase/auth";
import MenuItem from "../components/MenuItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const Beverages = () => {
  const currentUser=getAuth().currentUser
  const [beverages, setBeverages] = useState([]);
  const [favourites,setFavourites]=useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {

    totalItems,
    totalAmount,

  } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBeverages = async () => {
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch(`https://nsutcanteenbackend.onrender.com/beverages`,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch beverages");
        }
        const data = await response.json();
        setBeverages(data.beverages);
        setFavourites(data.favouriteList)
        console.log(data.favouriteList)
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBeverages();
  }, []);

  const filteredBeverages = beverages.filter((beverage) =>
    beverage.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
        {/* Circular Loader */}
        <div className="loader border-t-4 border-b-4 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>

        {/* Loading Text */}
        <div className="text-lg text-gray-500 mt-4">Loading beverages...</div>
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
                placeholder="Search beverages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

      <div className="mt-4 space-y-4">
        {filteredBeverages.map((beverage) =>{ 
          let favourite=false;
          if (favourites.includes(beverage.id)){
            favourite=true;
          }
          return (
          <MenuItem key={beverage.id} id={beverage.id} image_url={beverage.image_url} name={beverage.name} 
          selling_price={beverage.selling_price} rating={beverage.rating} description={beverage.description}
          availability={beverage.availability} favourite item_type="beverage"/>)
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

export default Beverages;