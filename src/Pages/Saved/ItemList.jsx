import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./components/MenuItem";
import { Menu } from "lucide-react";
const ItemList = ({ items, removeItem, itemType }) => {
  return (
    <div className="mt-4 space-y-4">
      {items.length > 0 ? (
        
        items.map((item) => (
          <MenuItem key={item.id} id={item.id} image_url={item.image_url} name={item.name} 
          selling_price={item.selling_price} rating={item.rating} description={item.description}
          availability={item.availability} favourite={true} item_type="snack"/>)
        )):null}
    </div>
  )
}
    //       <div
    //         key={item.id}
    //         className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative"
    //       >
    //         <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
    //           <img
    //             src={item.image}
    //             alt={item.name}
    //             className="w-full h-full object-cover rounded-lg"
    //           />
    //         </div>
    //         <div className="flex-1">
    //           <div className="flex items-center justify-between">
    //             <div className="flex items-center">
    //               <img
    //                 src={item.categoryIcon}
    //                 alt="Category"
    //                 className="w-5 h-5 md:w-6 md:h-6"
    //               />
    //               <h3 className="ml-2 text-lg md:text-xl font-bold">{item.name}</h3>
    //             </div>
    //             <button
    //               onClick={() => removeItem(item.id)}
    //               className="text-red-500 hover:text-red-700 transition-colors rounded-full p-2 hover:bg-red-100"
    //             >
    //               <FontAwesomeIcon icon={faTrashAlt} className="text-xl" />
    //             </button>
    //           </div>

    //           <p className="font-semibold text-lg mt-1">₹{item.price}</p>
    //           <p className="mt-1 text-sm md:text-base text-gray-600">{item.description}</p>
    //         </div>
    //       </div>
    //     ))
    //   ) : (
    //     <p className="text-center text-gray-500">No {itemType}</p>
    //   )}
export default ItemList;
