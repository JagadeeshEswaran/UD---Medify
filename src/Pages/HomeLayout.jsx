import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Header, Navbar, Loading } from "../Components";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <main>
      <Header />

      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <article className="align-element py-12">
          <Outlet />
        </article>
      )}
    </main>
  );
};

export default HomeLayout;
