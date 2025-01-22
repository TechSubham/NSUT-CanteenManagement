import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import QuantityControl from '@/assets/QuantityControlbutton';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalAmount
  } = useCart();

  const handleQuantityChange = (item, newQuantity) => {
    updateQuantity(item.id, item.category, newQuantity);
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.category);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add items to get started!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={`${item.category}-${item.id}`}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div>
                <h3 className="font-medium text-gray-800 text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm">₹{item.selling_price}</p>
                <p className="text-xs text-gray-400 capitalize">{item.category}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <QuantityControl
                quantity={item.quantity}
                onDecrease={() => handleQuantityChange(item, item.quantity - 1)}
                onIncrease={() => handleQuantityChange(item, item.quantity + 1)}
              />
              <FontAwesomeIcon
                onClick={() => handleRemoveItem(item)}
                variant="destructive"
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                icon={faTrashCan}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
        </div>
        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Total:</span>
          <span>₹{(Number(totalAmount)).toFixed(2)}</span>
        </div>

        <Button
          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-3 rounded-md text-center text-lg font-medium"
        >
          CHECK OUT
        </Button>
      </div>
    </div>
  );
};

export default Cart;
