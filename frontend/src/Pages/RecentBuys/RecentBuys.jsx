import React from "react";
import Coffee from "../../assets/Coffee1.avif";
import Veg from "../../assets/Veg.png";
import Star from "../../assets/star.avif";
import FooterIcons from "../FooterIcons/FooterIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const RecentBuys = () => {
  return (
    <div className="pb-20">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-xl">RECENT BUYS</h2>
          <div className="flex-1 ml-4">
            <div className="h-0.5 bg-gradient-to-r from-slate-400 to-transparent" />
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {/* Recent Buy Item */}
          <div className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative">
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <img 
                src={Coffee} 
                alt="Coffee" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={Veg} alt="Vegetarian" className="w-5 h-5 md:w-6 md:h-6" />
                  <h3 className="ml-2 text-lg md:text-xl font-bold">Coffee</h3>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FontAwesomeIcon icon={faBookmark} className="text-xl" />
                </button>
              </div>
              
              <p className="font-semibold text-lg mt-1">₹30</p>
              
              <div className="flex items-center mt-1">
                <img src={Star} alt="Rating" className="w-4 h-4 md:w-5 md:h-5" />
                <span className="ml-1 text-sm md:text-base">4.5</span>
              </div>
              
              <p className="mt-1 text-sm md:text-base text-gray-600">
                Description about the item
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {/* Recent Buy Item */}
          <div className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative">
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <img 
                src={Coffee} 
                alt="Coffee" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={Veg} alt="Vegetarian" className="w-5 h-5 md:w-6 md:h-6" />
                  <h3 className="ml-2 text-lg md:text-xl font-bold">Coffee</h3>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FontAwesomeIcon icon={faBookmark} className="text-xl" />
                </button>
              </div>
              
              <p className="font-semibold text-lg mt-1">₹30</p>
              
              <div className="flex items-center mt-1">
                <img src={Star} alt="Rating" className="w-4 h-4 md:w-5 md:h-5" />
                <span className="ml-1 text-sm md:text-base">4.5</span>
              </div>
              
              <p className="mt-1 text-sm md:text-base text-gray-600">
                Description about the item
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {/* Recent Buy Item */}
          <div className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative">
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <img 
                src={Coffee} 
                alt="Coffee" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={Veg} alt="Vegetarian" className="w-5 h-5 md:w-6 md:h-6" />
                  <h3 className="ml-2 text-lg md:text-xl font-bold">Coffee</h3>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FontAwesomeIcon icon={faBookmark} className="text-xl" />
                </button>
              </div>
              
              <p className="font-semibold text-lg mt-1">₹30</p>
              
              <div className="flex items-center mt-1">
                <img src={Star} alt="Rating" className="w-4 h-4 md:w-5 md:h-5" />
                <span className="ml-1 text-sm md:text-base">4.5</span>
              </div>
              
              <p className="mt-1 text-sm md:text-base text-gray-600">
                Description about the item
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterIcons />
    </div>
  );
};

export default RecentBuys;