import React from "react";
import { Form, redirect } from "react-router-dom";
import FormInput from "../FormInputs/FormInput";
import { axiosInstance, formatPrice } from "../../Utils";
import { toast } from "react-toastify";
import { clearCart } from "../../Features/cart/cartSlice";
import SubmitButton from "../Buttons/SubmitButton";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData.entries());

    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      const response = await axiosInstance.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      queryClient.removeQueries(["orders"]);

      store.dispatch(clearCart());
      toast.success("Order placed successfully!");
      return redirect("/orders");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error?.message ||
        "Error placing your order, Please try again";

      toast.error(errorMsg);

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        // return redirect("/login");
      }

      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <>
      <Form method="POST" className="flex flex-col gap-y-4">
        <h4 className="forn-medium text-xl capitalize">Shipping Information</h4>

        <FormInput label="first name" name="name" type="text" />
        <FormInput label="address" name="address" type="text" />

        <div className=" mt-4">
          <SubmitButton text="place your order" />
        </div>
      </Form>
    </>
  );
};

export default CheckoutForm;
