import React from "react";
import { useSelector } from "react-redux";
import { CartTotal, CheckoutForm, SectionTitle } from "../Components";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = (store) => () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warning("You must be logged in to checkout");
    return redirect("/");
  }

  return null;
};

const Checkout = () => {
  const cartTotal = useSelector((store) => store.cartState.cartTotal);
  // console.log("cartTotal : ", cartTotal);

  if (cartTotal === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="place your order" />

      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />

        <CartTotal />
      </div>
    </>
  );
};

export default Checkout;
