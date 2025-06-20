import React from "react";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function Checkout() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <Cart
      products={cartItems}
      text="Click Confirm Order to place your order"
      mode="confirm"
    ></Cart>
  );
}

export default Checkout;
