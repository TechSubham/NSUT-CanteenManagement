import React, { useEffect,useState } from "react";
import { useCart } from "@/contexts/CartContext";  
import FooterIcons from "../FooterIcons/FooterIcons";
import ItemList from "./ItemList";
import axios from "axios";
import { getAuth } from "firebase/auth";
import MenuItem from "../Food/components/MenuItem";
const SavedItems = () => {
  const currentUser=getAuth().currentUser
  const [savedItems, setSavedItems ] = useState([]);
  console.log(savedItems)
  useEffect(()=>{
    async function getFavourites(){
      try{
        const token=await currentUser.getIdToken()
        const response= await axios.get(`http://localhost:5050/favourites`,{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setSavedItems(response.data)
      }
      catch(err){
        console.log(err.message)
      }
    }
    getFavourites()
  },[])
  return (
    <div className="pb-20">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-xl">SAVED ITEMS</h2>
          <div className="flex-1 ml-4">
            <div className="h-0.5 bg-gradient-to-r from-slate-400 to-transparent" />
          </div>
        </div>
        {/* <MenuItem/> */}
        <ItemList
          items={savedItems}
          itemType="saved items"
        />
      </div>
      <FooterIcons/>
    </div>
    
  );
};

export default SavedItems;
