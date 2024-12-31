import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const addToCart = (item, category) => {
    const itemWithCategory = { ...item, category, cartId: `${category}-${item.id}` };
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.category === category
    );
    
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      updateTotals(updatedCart);
    } else {
      const updatedCart = [...cart, { ...itemWithCategory, quantity: 1 }];
      setCart(updatedCart);
      updateTotals(updatedCart);
    }
  };

  const removeFromCart = (itemId, category) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === itemId && item.category === category)
    );
    setCart(updatedCart);
    updateTotals(updatedCart);
  };

  const updateQuantity = (itemId, category, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId, category);
      return;
    }
    
    const updatedCart = cart.map((item) =>
      item.id === itemId && item.category === category
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
    updateTotals(updatedCart);
  };

  const getItemQuantity = (itemId, category) => {
    const item = cart.find(
      (cartItem) => cartItem.id === itemId && cartItem.category === category
    );
    return item ? item.quantity : 0;
  };

  const updateTotals = (updatedCart) => {
    const items = updatedCart.reduce((total, item) => total + item.quantity, 0);
    const amount = updatedCart.reduce(
      (total, item) => total + item.selling_price * item.quantity,
      0
    );
    setTotalItems(items);
    setTotalAmount(amount.toFixed(2));
  };

  const clearCart = () => {
    setCart([]);
    setTotalItems(0);
    setTotalAmount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}