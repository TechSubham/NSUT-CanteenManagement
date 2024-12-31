import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Veg from "../../../assets/Veg.png";
import Coffee from "../../../assets/coffee.png";
import Star from "../../../assets/star.avif";
import QuantityControl from "@/assets/QuantityControlbutton";

const Beverages = () => {
  const [beverages, setBeverages] = useState([]);
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
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeverages = async () => {
      try {
        const response = await fetch("http://localhost:5050/beverages");
        if (!response.ok) {
          throw new Error("Failed to fetch beverages");
        }
        const data = await response.json();
        setBeverages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBeverages();
  }, []);

  const handleDecrease = (beverage) => {
    const currentQty = getItemQuantity(beverage.id, "beverage");
    if (currentQty === 1) {
      removeFromCart(beverage.id, "beverage");
    } else if (currentQty > 0) {
      updateQuantity(beverage.id, "beverage", currentQty - 1);
    }
  };

  const handleIncrease = (beverage) => {
    const currentQty = getItemQuantity(beverage.id, "beverage");
    if (currentQty === 0) {
      addToCart(beverage, "beverage");
    } else {
      updateQuantity(beverage.id, "beverage", currentQty + 1);
    }
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cart.find(
      (item) => item.id === itemId && item.category === "beverage"
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const filteredBeverages = beverages.filter((beverage) =>
    beverage.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg">Loading beverages...</div>
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
      <div className="mt-2 ml-4">
        <Input
          className="rounded-xl w-[95%]"
          placeholder="Search beverages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mt-4 space-y-4">
        {filteredBeverages.map((beverage) => (
          <div
            key={beverage.id}
            className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative mx-4"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <img
                src={beverage.image_url || Coffee}
                alt={beverage.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={Veg}
                    alt="Vegetarian"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                  <h3 className="ml-2 text-lg md:text-xl font-bold">
                    {beverage.name}
                  </h3>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FontAwesomeIcon icon={faBookmark} className="text-xl" />
                </button>
              </div>

              <p className="font-semibold text-lg mt-1">
                ₹{beverage.selling_price}
              </p>

              {beverage.rating && (
                <div className="flex items-center mt-1">
                  <img
                    src={Star}
                    alt="Rating"
                    className="w-4 h-4 md:w-5 md:h-5"
                  />
                  <span className="ml-1 text-sm md:text-base">
                    {beverage.rating}
                  </span>
                </div>
              )}

              <p className="mt-1 text-sm md:text-base text-gray-600">
                {beverage.description || "Description about the item"}
              </p>

              {!beverage.availability && (
                <div className="mt-2 text-red-500 text-sm">
                  Currently unavailable
                </div>
              )}

              {beverage.availability && (
                <div className="absolute bottom-3 right-3">
                  {getItemQuantity(beverage.id) > 0 ? (
                    <QuantityControl
                      quantity={getItemQuantity(beverage.id)}
                      onDecrease={() => handleDecrease(beverage)}
                      onIncrease={() => handleIncrease(beverage)}
                    />
                  ) : (
                    <button
                      onClick={() => addToCart(beverage, "beverage")}
                      className="bg-white text-green-500 border border-green-500 px-6 py-2 rounded-lg hover:bg-green-50 font-semibold"
                    >
                      ADD
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
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