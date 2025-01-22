import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    setIsOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out");
    setIsOpen(false);
    navigate('/login'); 
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 w-full h-12 z-40 sm:h-auto bg-white  ">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <div className="flex items-center">
              <span className="sm:text-base md:text-lg lg:text-xl text-orange-500 text-2xl mr-2">
                🍽️
              </span>
              <span className="text-xs sm:text-base md:text-lg lg:text-xl font-bold text-black ">
                EASYEAT
              </span>
            </div>

            {/* Mobile menu button */}
            <Menu className="w-5 sm:hidden" onClick={() => setIsOpen(true)} />

            {/* Desktop menu */}
            <div className="hidden sm:flex space-x-4 ">
              {["/HomePage", "/menu"].map((path, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(path)}
                  className="text-black font-bold hover:text-orange-500 text-sm"
                >
                  {path.replace("/", "").toUpperCase()}
                </button>
              ))}
            </div>

            {/* Icons */}
            <div className="hidden sm:flex space-x-3">
              <ShoppingCart
                className="text-black cursor-pointer"
                onClick={() => handleNavigation("/cart")}
                size={20}
              />
              <Search
                className="text-black cursor-pointer"
                onClick={() => handleNavigation("/search")}
                size={20}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white/90 backdrop-blur-sm shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="text-gray-800" size={24} />
          </button>
        </div>

        <div className="flex flex-col px-6 py-4">
          {["/HomePage", "/menu"].map((path, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(path)}
              className="py-3 text-left text-gray-800 hover:text-orange-500 border-b border-gray-200"
            >
              {path.replace("/", "").toUpperCase()}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="mt-6 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
