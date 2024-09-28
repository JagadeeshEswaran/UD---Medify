import { useSelector } from "react-redux";
import { CartItemsList, CartTotal, SectionTitle } from "../Components";
import { Link } from "react-router-dom";
import CartTotals from "../Components/CartPage/CartTotals";

const Cart = () => {
  const user = useSelector((store) => store.userState.user);

  const numItemsInCart = useSelector((store) => store.cartState.numItemsInCart);

  if (numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12 ">
        {/* CART ITEMS LIST */}
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>

        {/* CART TOTAL CARD */}
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />

          {user !== null ? (
            <Link className="btn btn-primary btn-block mt-8" to="/checkout">
              proceed to checkout
            </Link>
          ) : (
            <Link className="btn btn-primary btn-block mt-8" to="/login">
              Login to my Account
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
