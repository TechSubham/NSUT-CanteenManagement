import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHistory, faBookmark, faUser } from "@fortawesome/free-solid-svg-icons";

const FooterIcons = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-3 px-4 block md:hidden">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <button className="flex flex-col items-center">
          <FontAwesomeIcon icon={faCartShopping} className="text-2xl text-gray-400 hover:text-gray-600" />
          <span className="text-xs mt-1">Cart</span>
        </button>
        <button className="flex flex-col items-center">
          <FontAwesomeIcon icon={faHistory} className="text-2xl text-gray-400 hover:text-gray-600" />
          <span className="text-xs mt-1">History</span>
        </button>
        <button className="flex flex-col items-center">
          <FontAwesomeIcon icon={faBookmark} className="text-2xl text-gray-400 hover:text-gray-600" />
          <span className="text-xs mt-1">Saved</span>
        </button>
        <button className="flex flex-col items-center">
          <FontAwesomeIcon icon={faUser} className="text-2xl text-gray-400 hover:text-gray-600" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default FooterIcons;