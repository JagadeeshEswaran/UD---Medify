import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartItemsList = () => {
  const cartItemsList = useSelector((store) => store.cartState.cartItems);

  console.log("cartItemsList : ", cartItemsList);

  return (
    <>
      {cartItemsList.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </>
  );
};

export default CartItemsList;
