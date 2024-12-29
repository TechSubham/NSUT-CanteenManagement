import React from "react";
import Coffee from "../../assets/coffee.png";
import Panner from "../../assets/panner.avif";
import Samosa from "../../assets/Samosa.avif";
import RecentBuys from "../RecentBuys/RecentBuys";
import { useNavigate } from "react-router-dom";
import  Beverage from "../Food/Beverages/Beverages"

const FoodIcons = () => {
    const navigate = useNavigate();

    const NavigateToBeverage = async()=>{
        try{
            navigate("/Food/Beverages")
        }catch(err){
            console.log(err)
        }
    }

    const NavigateToMeal = async() => {
        try {
            navigate("/Food/Meal")
        }catch(err){
            console.log(err)
        }
    }

    const NavigateToSnacks = async() =>{
        try{
            navigate("/Food/Snacks")
        }catch(err){
            console.log(err)
        }
    }
  return (
    <>
      <div className="lg:text-2xl mb-3 grid grid-cols-2 items-center">
        <div>WHAT'S ON YOUR MIND?</div>
        <div className="block sm:hidden h-0.5 bg-gradient-to-r from-slate-400 to-white mt-1"></div>
      </div>

      <div className="grid grid-cols-3 text-gray-500">
        <div className="flex flex-col items-center justify-center"
        onClick={NavigateToBeverage}>
          <img
            src={Coffee}
            alt="coffee"
            className="transition-transform duration-300 transform hover:scale-110 w-96"
          />
          <p className="mt-3 md:text-xl">Beverages</p>
        </div>
        <div className="flex flex-col items-center justify-center" onClick={NavigateToMeal}>
          <img
            src={Panner}
            alt="panner"
            className="transition-transform duration-300 transform hover:scale-110 w-96"
          />
          <p className="mt-3 md:text-xl">Meals</p>
        </div>
        <div className="flex flex-col items-center justify-center" onClick={NavigateToSnacks}>
          <img
            src={Samosa}
            alt="samosa"
            className="transition-transform duration-300 transform hover:scale-110 w-96"
          />
          <p className="mt-3 md:text-xl">Snacks</p>
        </div>
      </div>
      <RecentBuys />
    </>
  );
};

export default FoodIcons;
