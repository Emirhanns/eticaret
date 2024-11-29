import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // CartItems'in localStorage'dan okunduğu durum
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  // cartItems değiştiğinde localStorage'a kaydetmek
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sepete ürün eklemek
  const addToCart = (cartItem) => {
    setCartItems((prevCart) => [
      ...prevCart,
      {
        ...cartItem,
        quantity: cartItem.quantity ? cartItem.quantity : 1,
      },
    ]);
  };

  // Ürün miktarını güncellemek
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  

  // Sepetten ürün çıkarmak
  const removeFromCart = (itemId) => {
    const filteredCartItems = cartItems.filter((cartItem) => {
      return cartItem._id !== itemId;
    });

    setCartItems(filteredCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,        // Sepetteki ürünler
        setCartItems,     // Sepeti güncelleyen fonksiyon
        addToCart,        // Sepete ürün ekleyen fonksiyon
        removeFromCart,   // Sepetten ürün çıkaran fonksiyon
        updateQuantity,   // Ürün miktarını güncelleyen fonksiyon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

CartProvider.propTypes = {
  children: PropTypes.node,
};
