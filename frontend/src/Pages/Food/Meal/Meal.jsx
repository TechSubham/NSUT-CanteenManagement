import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Veg from "../../../assets/Veg.png";
import DefaultMealImage from "../../../assets/panner.avif";
import Star from "../../../assets/star.avif";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('http://localhost:8080/meals');
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
        const data = await response.json();
        setMeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const filteredMeals = meals.filter(meal =>
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
    <div>
      <div className="mt-2 ml-4">
        <Input 
          className="rounded-xl w-[95%]" 
          placeholder="Search meals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <div className="mt-4 space-y-4">
          {filteredMeals.map((meal) => (
            <div key={meal.id} className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative">
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <img 
                  src={meal.image_url || DefaultMealImage}
                  alt={meal.name} 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={Veg} alt="Vegetarian" className="w-5 h-5 md:w-6 md:h-6" />
                    <h3 className="ml-2 text-lg md:text-xl font-bold">{meal.name}</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <FontAwesomeIcon icon={faBookmark} className="text-xl" />
                  </button>
                </div>
                
                <p className="font-semibold text-lg mt-1">₹{meal.selling_price}</p>
                
                {meal.rating && (
                  <div className="flex items-center mt-1">
                    <img src={Star} alt="Rating" className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="ml-1 text-sm md:text-base">{meal.rating}</span>
                  </div>
                )}
                
                <p className="mt-1 text-sm md:text-base text-gray-600">
                  {meal.description || "Description about the item"}
                </p>

                {!meal.availability && (
                  <div className="mt-2 text-red-500 text-sm">
                    Currently unavailable
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meals;
