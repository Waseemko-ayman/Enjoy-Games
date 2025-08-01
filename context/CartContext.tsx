'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { ProductCardProps } from '@/interfaces';

const CART_STORAGE_KEY = 'my_cart_items';

interface CartContextType {
  cartItems: ProductCardProps[];
  addToCart: (item: ProductCardProps) => void;
  updateQuantity: (idOrSlug: number | string, quantity: number) => void;
  removeFromCart: (idOrSlug: number | string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<ProductCardProps[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // const addToCart = (item: ProductCardProps) => {
  //   setCartItems((prev) => {
  //     const existing = prev.find(
  //       (i) => i.id === item.id && i.slug === item.slug
  //     );
  //     if (existing) {
  //       return prev.map((i) =>
  //         i.id === item.id && i.slug === item.slug
  //           ? { ...i, quantity: (i.quantity ?? 1) + 1 }
  //           : i
  //       );
  //     }
  //     return [...prev, { ...item, quantity: 1 }];
  //   });
  // };

  const addToCart = (item: ProductCardProps) => {
    const quantityToAdd = item.quantity ?? 1;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id && i.slug === item.slug
      );

      if (existingIndex !== -1) {
        // انسخ الـ prev بالكامل
        const updatedItems = [...prev];
        // زيد الكمية للعنصر الموجود
        const existingItem = updatedItems[existingIndex];
        const newQuantity = (existingItem.quantity ?? 1) + quantityToAdd;
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };
        return updatedItems;
      }

      // المنتج جديد
      return [...prev, { ...item, quantity: quantityToAdd }];
    });
  };

  const updateQuantity = (idOrSlug: number | string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === idOrSlug || item.slug === idOrSlug
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (idOrSlug: number | string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== idOrSlug && item.slug !== idOrSlug)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error('useCartContext must be used within CartProvider');
  return context;
};
