'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Product } from '../../types';

interface CartContextState {
  updateCart: boolean;
  setUpdateCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

interface CartProviderProps {
  children: ReactNode;
}

const UpdateCartContext = createContext<CartContextState | undefined>(
  undefined
);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [updateCart, setUpdateCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  return (
    <UpdateCartContext.Provider
      value={{ updateCart, setUpdateCart, cartItems, setCartItems }}
    >
      {children}
    </UpdateCartContext.Provider>
  );
};

// Custom hook to use the UpdateCartContext
export const useCart = (): CartContextState => {
  const context = useContext(UpdateCartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
