import React, { useState } from "react";
import Coffee from "../../assets/coffee.png";
import Panner from "../../assets/panner.avif";
import Samosa from "../../assets/Samosa.avif";
import RecentBuys from "../RecentBuys/RecentBuys";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FoodIcons = () => {
  const navigate = useNavigate();
  const [scrollIndex, setScrollIndex] = useState(0);

  const categories = [
    { name: "Tea", image: Coffee },
    { name: "Paneer", image: Panner },
    { name: "Samosa", image: Samosa },
    { name: "Tea", image: Coffee },
    { name: "Paneer", image: Panner },
    { name: "Samosa", image: Samosa },
    { name: "Tea", image: Coffee },
    { name: "Paneer", image: Panner },
    { name: "Samosa", image: Samosa },
    { name: "Tea", image: Coffee },
    { name: "Paneer", image: Panner },
    { name: "Samosa", image: Samosa },
  ];

  const handleNavigate = async (path) => {
    try {
      navigate(path);
    } catch (err) {
      console.log(err);
    }
  };

  const handleScrollLeft = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (scrollIndex < categories.length - 4) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  return (
    <>
      {/* What's on Your Mind Section */}
      <div className="grid grid-cols-1 text-gray-500 mt-4 sm:mt-1 md:mt-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4 sm:mb-6 md:mb-8">
            What's on Your Mind?
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl px-4 md:px-8">
            Craving something special or thinking about your next meal? <br />
            Browse through our categories or let us surprise you with some top picks!
          </p>
        </div>
      </div>

      {/* Header with Arrows */}
      <div className="flex items-center justify-center mb-10 mt-8 w-full">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mr-4 text-center">
          Order our best food options
        </h1>
        <div className="flex space-x-4">
          <button
            className={`bg-white border rounded-full shadow p-2 sm:p-3 ${
              scrollIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            onClick={handleScrollLeft}
            disabled={scrollIndex === 0}
          >
            <FaChevronLeft className="text-sm sm:text-base md:text-lg" />
          </button>
          <button
            className={`bg-white border rounded-full shadow p-2 sm:p-3 ${
              scrollIndex >= categories.length - 4
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            onClick={handleScrollRight}
            disabled={scrollIndex >= categories.length - 4}
          >
            <FaChevronRight className="text-sm sm:text-base md:text-lg" />
          </button>
        </div>
      </div>

      {/* Scrollable Food Icons */}
      <div className="relative w-full overflow-hidden px-4">
        <div
          className="flex items-center space-x-4 md:space-x-6 transition-transform duration-500"
          style={{
            transform: `translateX(-${scrollIndex * 20}%)`,
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer flex-shrink-0"
              onClick={() => handleNavigate(category.navigateTo)}
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <p className="mt-3 text-sm sm:text-base md:text-lg font-medium">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Categories Grid - Modified for horizontal layout */}
      <div className="flex justify-between px-4 mt-10">
        <div
          className="flex flex-col items-center cursor-pointer w-1/3"
          onClick={() => handleNavigate("/Food/Beverages")}
        >
          <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-64 rounded-full overflow-hidden">
            <img
              src={Coffee}
              alt="coffee"
              className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
            />
          </div>
          <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-500">Beverages</p>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer w-1/3"
          onClick={() => handleNavigate("/Food/Meal")}
        >
          <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-64 rounded-full overflow-hidden">
            <img
              src={Panner}
              alt="panner"
              className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
            />
          </div>
          <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-500">Meals</p>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer w-1/3"
          onClick={() => handleNavigate("/Food/Snacks")}
        >
          <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-64 rounded-full overflow-hidden">
            <img
              src={Samosa}
              alt="samosa"
              className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
            />
          </div>
          <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-500">Snacks</p>
        </div>
      </div>

      <RecentBuys />
    </>
  );
};

export default FoodIcons;