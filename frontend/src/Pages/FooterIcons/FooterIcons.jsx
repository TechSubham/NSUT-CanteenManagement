import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHistory, faBookmark, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

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
        <Link to = "/saved-items" className="flex flex-col items-center">
        <button className="flex flex-col items-center">
          <FontAwesomeIcon icon={faBookmark} className="text-2xl text-gray-400 hover:text-gray-600" />
          <span className="text-xs mt-1">Saved</span>
        </button>
        </Link>
        <Link to = "/contact-us" className="flex flex-col items-center">
        <button className="flex flex-col items-center">
          <FontAwesomeIcon icon={faAddressBook} className="text-2xl text-gray-400 hover:text-gray-600" />
          <span className="text-xs mt-1">Contact Us</span>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default FooterIcons;