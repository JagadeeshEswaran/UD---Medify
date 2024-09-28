import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "/about", text: "about" },
  { id: 3, url: "/products", text: "products" },
  { id: 4, url: "/cart", text: "cart" },
  { id: 5, url: "/checkout", text: "checkout" },
  { id: 6, url: "/orders", text: "orders" },
];

const NavLinks = () => {
  const user = useSelector((store) => store.userState.user);

  return (
    <>
      {links.map((item) => (
        <li key={item.id} className="me-2 mb-2">
          {!user && (item.url === "/checkout" || item.url === "/orders") ? (
            <></>
          ) : (
            <NavLink className="capitalize font-semibold" to={item.url}>
              {item.text}
            </NavLink>
          )}
        </li>
      ))}
    </>
  );
};

export default NavLinks;
