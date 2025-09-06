// context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const normalizeMealType = (m) => {
  const s = (m || '').toString().toLowerCase().trim();
  if (s.includes('main')) return 'main course';
  if (s.includes('start')) return 'starter';
  if (s.includes('dessert')) return 'dessert';
  if (s.includes('side')) return 'sides';
  return s;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // stores full dish objects

  const addToCart = (dish) => {
    setCartItems(prev => (prev.some(i => i.id === dish.id) ? prev : [...prev, dish]));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const isInCart = (id) => cartItems.some(i => i.id === id);

  const totalCount = cartItems.length;

  const countByCategory = (mealType) => {
    const key = normalizeMealType(mealType);
    return cartItems.filter(i => normalizeMealType(i.mealType) === key).length;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isInCart, totalCount, countByCategory }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
