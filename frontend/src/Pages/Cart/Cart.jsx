import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";
import QuantityControl from '@/assets/QuantityControlbutton';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="space-y-4">
        {cart.map((item) => (
          <div 
            key={`${item.category}-${item.id}`}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.selling_price}</p>
                <p className="text-sm text-gray-500 capitalize">{item.category}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <QuantityControl
                quantity={item.quantity}
                onDecrease={() => handleQuantityChange(item, item.quantity - 1)}
                onIncrease={() => handleQuantityChange(item, item.quantity + 1)}
              />
              <Button
                onClick={() => handleRemoveItem(item)}
                variant="destructive"
                size="sm"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between mb-2">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total Amount:</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;