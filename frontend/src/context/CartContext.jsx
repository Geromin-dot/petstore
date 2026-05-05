import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('petstore_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('petstore_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (pet) => {
    setCartItems((prev) => {
      // Don't add if already in cart
      if (prev.find(item => item.id === pet.id)) return prev;
      return [...prev, pet];
    });
  };

  const removeFromCart = (petId) => {
    setCartItems((prev) => prev.filter(item => item.id !== petId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price || 0), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
