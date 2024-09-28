import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../Features/cart/cartSlice";
import { logoutUser } from "../Features/user/userSlice";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((store) => store.userState.user);

  const handleLogout = () => {
    navigate("/");
    dispatch(clearCart());
    dispatch(logoutUser());
    queryClient.removeQueries();
  };

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <article className="align-element flex justify-center sm:justify-end">
        {user ? (
          <>
            {/* USER */}
            <div className="flex gap-2 sm:gap-x-8 items-center">
              <p className="text-xs sm:text-sm">Hello, {user.username}</p>

              <button
                className="btn btn-xs btn-outline btn-primary"
                onClick={handleLogout}
              >
                logout
              </button>
            </div>
          </>
        ) : (
          <>
            {/* LINKS */}
            <div className="flex gap-x-6 juctify-center items-end">
              <Link to="/login" className="link link-hover text-xs sm-text-sm">
                Sign in / Guest
              </Link>
              <Link
                to="/register"
                className="link link-hover text-xs sm-text-sm"
              >
                Create Account
              </Link>
            </div>
          </>
        )}
      </article>
    </header>
  );
};

export default Header;
