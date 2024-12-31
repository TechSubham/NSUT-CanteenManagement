import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import bg1 from "../../assets/food bg.jpg";
import bg2 from "../../assets/Cook.jpg";
import bg3 from "../../assets/food3.jpg";

import { Button } from "@/components/ui/button";
import Navbar from "../Navbar/page";
import FoodIcons from "../FoodIcons/FoodIcons";

const Page = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const backgroundStyle = (image) => ({
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
    "@media (max-width: 640px)": {
      backgroundSize: "contain",
      backgroundPosition: "center center",
    },
  });

  return (
    <div className="min-h-screen bg-white  rounded-full">
      <Navbar />
      <div className="h-[30vh] sm:h-[50vh] md:h-screen lg:h-screen flex items-center justify-center overflow-hidden relative bg-black">
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat sm:bg-cover md:bg-cover lg:bg-cover"
          style={{
            ...backgroundStyle(bg1),
            opacity: currentIndex === 0 ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
          <div className="h-full flex flex-col items-center justify-center text-white relative z-10">
            <div className="gap-4 px-4 w-full sm:w-full md:w-1/2 lg:w-1/2 mx-auto">
              <div className="hidden lg:block"></div>
              <div className="text-center md:col-span-2 lg:col-span-1 p-4 sm:p-6 md:p-8">
                <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-bold drop-shadow-lg">
                  Welcome to NSUT Canteen
                </h1>
                <div className="mt-4 sm:mt-4 md:mt-6 lg:mt-10 flex justify-center">
                  <Button className="bg-orange-500 text-white px-4 py-2 rounded-lg transition-transform duration-300 hover:scale-110 hover:bg-orange-500 shadow-lg hover:shadow-xl">
                    View Menu
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat sm:bg-cover md:bg-cover lg:bg-cover"
          style={{
            ...backgroundStyle(bg2),
            opacity: currentIndex === 1 ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
          <div className="h-full flex flex-col items-center justify-center text-white relative z-10">
            <div className="gap-4 px-4 w-full sm:w-full md:w-1/2 lg:w-1/2 mx-auto">
              <div className="hidden lg:block"></div>
              <div className="text-center md:col-span-2 lg:col-span-1 p-4 sm:p-6 md:p-8">
                <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-bold drop-shadow-lg">
                  Enjoy delicious meals prepared by experts!
                </h1>
                <div className="mt-4 sm:mt-4 md:mt-6 lg:mt-10 flex justify-center">
                  <Button className="bg-orange-500 text-white px-4 py-2 rounded-lg transition-transform duration-300 hover:scale-110 hover:bg-orange-500 shadow-lg hover:shadow-xl">
                    View Menu
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat sm:bg-cover md:bg-cover lg:bg-cover"
          style={{
            ...backgroundStyle(bg3),
            opacity: currentIndex === 2 ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
          <div className="h-full flex flex-col items-center justify-center text-white relative z-10">
            <div className="gap-4 px-4 w-full sm:w-full md:w-1/2 lg:w-1/2 mx-auto">
              <div className="hidden lg:block"></div>
              <div className="text-center md:col-span-2 lg:col-span-1 p-4 sm:p-6 md:p-8">
                <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-bold drop-shadow-lg">
                  Order your favorite dishes with just a click!
                </h1>
                <div className="mt-4 sm:mt-4 md:mt-6 lg:mt-10 flex justify-center">
                  <Button className="bg-orange-500 text-white px-4 py-2 rounded-lg transition-transform duration-300 hover:scale-110 hover:bg-orange-500 shadow-lg hover:shadow-xl">
                    View Menu
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </div>
      <FoodIcons />
    </div>
  );
};

export default Page;
