import React from "react";
import AppContext from "../../context";

export function useCart() {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const priseEnd = cartItems.reduce(
    (sum, current) => parseInt(current.price.match(/\d+/)) + sum,
    0
  );

  return { cartItems, priseEnd, setCartItems };
}
