import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find(
        (item) => item.cartId === product.cartId
      );

      if (item) {
        item.productCount += product.productCount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.productCount;
      state.cartTotal += product.price * product.productCount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success("Item added to cart!");
    },

    editItem: (state, action) => {
      const { cartId, productCount } = action.payload;
      const item = state.cartItems.find((item) => item.cartId === cartId);
      state.numItemsInCart += productCount - item.productCount;
      state.cartTotal += item.price * (productCount - item.productCount);

      item.productCount = productCount;

      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart Updated!");
    },

    clearCart: () => localStorage.setItem("cart", JSON.stringify(defaultState)),

    removeItem: (state, action) => {
      const { cartId } = action.payload;
      const product = state.cartItems.find((item) => item.cartId === cartId);

      state.cartItems = state.cartItems.filter(
        (item) => item.cartId !== cartId
      );

      state.numItemsInCart -= product.productCount;
      state.cartTotal -= product.price * product.productCount;

      cartSlice.caseReducers.calculateTotals(state);
      toast.warning("Item Removed from cart!");
    },

    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, editItem, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
