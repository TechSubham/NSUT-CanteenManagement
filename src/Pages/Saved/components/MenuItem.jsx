import Veg from "../../../assets/Veg.png";
import Panner from "../../../assets/panner.avif";
import Star from "../../../assets/star.avif";
import QuantityControl from "@/assets/QuantityControlbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/contexts/CartContext";
import { getAuth } from "firebase/auth";
import axios from "axios";
import{
    useEffect,useState
} from "react"
const MenuItem=(props)=>{
    const currentUser=getAuth().currentUser
    const {cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    } = useCart();
    const [favourite,setFavourite]=useState(props.favourite)
    const [toggleFavourite,setToggleFavourite]=useState(0)
    const handleDecrease = (meal) => {
        const currentQty = getItemQuantity(meal);
        console.log(currentQty)
        if (currentQty === 1) {
          removeFromCart(meal.id, meal.item_type);
        } else if (currentQty > 0) {
          updateQuantity(meal.id, meal.item_type, currentQty - 1);
        }
      };
    
      const handleIncrease = (meal) => {
        const currentQty = getItemQuantity(meal);
        if (currentQty === 0) {
          addToCart(meal, meal.item_type);
        } else {
          updateQuantity(meal.id, meal.item_type, currentQty + 1);
        }
      };
    
      const getItemQuantity = (meal) => {
        const cartItem = cart.find(
          (item) => item.id === meal.id && item.category === meal.item_type
        );
        return cartItem ? cartItem.quantity : 0;
      };
    useEffect(()=>{
        async function updateFavourite(){
            try{
                const token = await currentUser.getIdToken();
                console.log(props)
                await axios.post("https://nsutcanteenbackend.onrender.com/update-favourite",{
                    item_id:props.id,
                    favourite:!favourite,
                    item_type:props.item_type
                },{         
                    headers: {
                    'Authorization': `Bearer ${token}`,
                 }})
                 setToggleFavourite(0)
                 setFavourite((prev)=>(!prev))
            }
            catch(err){
                console.log("Hello")
                console.error(err.message)
                setToggleFavourite(0)
            }
        }
        if(toggleFavourite){
            updateFavourite();
        }
    },[toggleFavourite])
    if(favourite){
    return (
      <div className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative mx-4">
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <img
                src={props.image_url}
                alt={props.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={Veg}
                    alt="Vegetarian"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                  <h3 className="ml-2 text-lg md:text-xl font-bold">
                    {props.name}
                  </h3>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={()=>{setToggleFavourite(1)}}>
                  {favourite?
                  <FontAwesomeIcon icon={faHeart} className="text-xl" style={{ color: 'goldenrod' }} />:
                  <FontAwesomeIcon icon={faHeart} className="text-xl" />
                  }
                </button>
              </div>

              <p className="font-semibold text-lg mt-1">
                ₹{props.selling_price}
              </p>

              {props.rating && (
                <div className="flex items-center mt-1">
                  <img
                    src={Star}
                    alt="Rating"
                    className="w-4 h-4 md:w-5 md:h-5"
                  />
                  <span className="ml-1 text-sm md:text-base">
                    {props.rating}
                  </span>
                </div>
              )}

              <p className="mt-1 text-sm md:text-base text-gray-600">
                {props.description || "Description about the item"}
              </p>

              {!props.availability && (
                <div className="mt-2 text-red-500 text-sm">
                  Currently unavailable
                </div>
              )}

              {props.availability && (
                <div className="absolute bottom-3 right-3">
                  {getItemQuantity(props) > 0 ? (
                    <QuantityControl
                      quantity={getItemQuantity(props)}
                      onDecrease={() => handleDecrease(props)}
                      onIncrease={() => handleIncrease(props)}
                    />
                  ) : (
                    <button
                      onClick={() => addToCart(props, props.item_type)}
                      className="bg-white text-green-500 border border-green-500 px-6 py-2 rounded-lg hover:bg-green-50 font-semibold"
                    >
                      ADD
                    </button>
                  )}
                </div>)}
            </div>
        </div>
      )
    }
}
export default MenuItem;