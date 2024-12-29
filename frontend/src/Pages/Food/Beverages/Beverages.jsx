import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Veg from "../../../assets/Veg.png";
import Coffee from "../../../assets/coffee.png";
import Star from "../../../assets/star.avif";

const Beverages = () => {
  const [beverages, setBeverages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeverages = async () => {
      try {
        const response = await fetch('http://localhost:8080/beverages');
        if (!response.ok) {
          throw new Error('Failed to fetch beverages');
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

  const filteredBeverages = beverages.filter(beverage =>
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
    <div>
      <div className="mt-2 ml-4">
        <Input 
          className="rounded-xl w-[95%]" 
          placeholder="Search beverages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <div className="mt-4 space-y-4">
          {filteredBeverages.map((beverage) => (
            <div key={beverage.id} className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative">
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
                    <img src={Veg} alt="Vegetarian" className="w-5 h-5 md:w-6 md:h-6" />
                    <h3 className="ml-2 text-lg md:text-xl font-bold">{beverage.name}</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <FontAwesomeIcon icon={faBookmark} className="text-xl" />
                  </button>
                </div>
                
                <p className="font-semibold text-lg mt-1">₹{beverage.selling_price}</p>
                
                {beverage.rating && (
                  <div className="flex items-center mt-1">
                    <img src={Star} alt="Rating" className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="ml-1 text-sm md:text-base">{beverage.rating}</span>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Beverages;