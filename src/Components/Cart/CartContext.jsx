
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartLength, setCartLength] = useState(0);

  const updateCartLength = () => {
    const length = parseInt(localStorage.getItem('cartLength'), 10) || 0;
    setCartLength(length);
  };

  useEffect(() => {
    updateCartLength();
    window.addEventListener('storage', updateCartLength);
    return () => {
      window.removeEventListener('storage', updateCartLength);
    };
  }, []);

  return (
    <CartContext.Provider value={{ cartLength, setCartLength }}>
      {children}
    </CartContext.Provider>
  );
};
