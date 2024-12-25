import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

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

  return (
    <div>
      <nav className="fixed top-0 w-full z-50 bg-transparent py-4">
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
              <div>
                <FontAwesomeIcon icon={faBars} className="text-white" />
              </div>
              {/* <button
                onClick={handleGoogleSignIn}
                className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md font-semibold transition-all duration-300"
              >
                Sign In
              </button> */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
