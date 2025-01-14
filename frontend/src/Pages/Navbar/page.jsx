import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
  faBars,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await signOut(auth);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/HomePage");
    } catch (err) {
      console.error("Error signing in:", err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      setIsOpen(false);
    } catch (err) {
      console.error("Error signing out:", err.message);
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-transparent py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="sm:flex hidden items-center space-x-4">
              <a href="#" className="text-white font-bold hover:text-orange-500">
                HOME
              </a>
              <a href="#" className="text-white hover:text-orange-500">
                MENU
              </a>
            </div>

            <div className="flex items-center">
              <i className="fas fa-utensils text-orange-500 text-2xl mr-2"></i>
              <span className="text-white font-bold text-2xl hidden sm:block">
                EASYEAT
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <FontAwesomeIcon icon={faCartShopping} className="text-white hidden sm:block" />
              </div>
              <div>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white hidden sm:block" />
              </div>
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <FontAwesomeIcon icon={faBars} className="text-white text-xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faXmark} className="text-xl text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col px-6 py-4">
          <a 
            href="#" 
            className="py-3 text-gray-800 hover:text-orange-500 border-b border-gray-200"
          >
            HOME
          </a>
          <a 
            href="#" 
            className="py-3 text-gray-800 hover:text-orange-500 border-b border-gray-200"
          >
            MENU
          </a>
          <button
            onClick={handleLogout}
            className="mt-6 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;