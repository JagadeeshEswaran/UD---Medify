import React from "react";
import { formatPrice, generateCountOptions } from "../../Utils";
import { editItem, removeItem } from "../../Features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { cartId, title, company, price, image, productCount, productColor } =
    item;

  const removeItemFromCart = () => {
    dispatch(removeItem({ cartId }));
  };

  const handleCountChange = (e) => {
    dispatch(editItem({ cartId, productCount: parseInt(e.target.value) }));
  };

  return (
    <>
      <article
        key={cartId}
        className="mb-12 flex flex-col hap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
      >
        {/* ITEM IMAGE */}
        <img
          src={image}
          alt={title}
          className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
        />

        {/* ITEM INFO */}
        <div className="sm:ml-16 sm:w-48">
          {/* TITLE */}
          <h3 className="capitalize font-medium">{title}</h3>

          {/* COMPANY*/}
          <h4 className=" capitalize text-xs text-neutral-content mt-2">
            {company}
          </h4>

          {/* COLORS */}
          <p className="mt-2 text-sm capitalize flex items-center gap-x-2">
            color :{" "}
            <span
              className="badge badge-sm"
              style={{ backgroundColor: productCount }}
            ></span>
          </p>
        </div>

        {/* CHANGE COUNT AND REMOVE ITEM */}
        <div className="sm:ml-12">
          {/* PRODUCT COUNT */}
          <div className="form-control max-w-xs">
            <label className="label p-0">
              <span className=" label-text">Count</span>
            </label>

            <select
              name="amount"
              id="amount"
              className=" mt-2 select select-base select-bordered select-xs"
              onChange={handleCountChange}
              value={productCount}
            >
              {generateCountOptions(productCount + 5)}
            </select>
          </div>

          {/* REMOVE ITEM */}
          <button
            className="mt-2 link link-primary link-hover text-sm"
            onClick={removeItemFromCart}
          >
            remove
          </button>
        </div>

        {/* ITEM PRICE */}
        <p className=" font-medium sm:ml-auto">{formatPrice(price)}</p>
      </article>
    </>
  );
};

export default CartItem;
