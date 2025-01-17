import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useCart } from "../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MenuItem from "../components/MenuItem";
import { getFirebaseAuth } from "../../../firebase/firebase"; // Updated import

const Meals = () => {
  const auth = getFirebaseAuth(); // Get auth instance
  const [meals, setMeals] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    totalItems,
    totalAmount,
    savedItems,
    toggleSaveItem
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('No authenticated user');
        }

        const token = await currentUser.getIdToken();
        const response = await fetch(`http://localhost:5050/meals`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMeals(data.meals);
        setFavourites(data.favouriteList);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching meals:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, [auth]);

  const isItemSaved = (itemId) => {
    return savedItems.some(item => item.id === itemId);
  };

  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg">Loading meals...</div>
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
          placeholder="Search meals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mt-4 space-y-4">
        {filteredMeals.map((meal) => {
          const favourite = favourites.includes(meal.id);
          return (
            <MenuItem
              key={meal.id}
              id={meal.id}
              image_url={meal.image_url}
              name={meal.name}
              selling_price={meal.selling_price}
              rating={meal.rating}
              description={meal.description}
              availability={meal.availability}
              favourite={favourite}
              item_type="meal"
            />
          );
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

export default Meals;