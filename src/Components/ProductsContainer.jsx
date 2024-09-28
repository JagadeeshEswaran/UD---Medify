import React from "react";
import ProductsGrid from "./Products/ProductsGrid";
import ProductsList from "./Products/ProductsList";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { BsFillGridFill, BsList } from "react-icons/bs";
import PaginationContainer from "./PaginationContainer";

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const [productsView, setView] = useState("grid");
  const totalProducts = meta.pagination.total;

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === productsView
        ? "btn-primary text-primary-content"
        : "btn-ghost text-based-content"
    }`;
  };

  return (
    <>
      {/* HEADER */}
      <div className="mt-8 border-b pb-5 flex gap-4 items-center justify-between border-base-300">
        <h4 className="font-medium text-md" onClick={() => setView("grid")}>
          {totalProducts} product{totalProducts > 1 && "s"}
        </h4>

        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={setActiveStyles("grid")}
          >
            <BsFillGridFill />
          </button>

          <button
            type="button"
            onClick={() => setView("list")}
            className={setActiveStyles("list")}
          >
            <BsList />
          </button>
        </div>
      </div>

      <PaginationContainer position="start" />

      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 || !totalProducts || totalProducts.length === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, Unable to fetch any product at the moment.
          </h5>
        ) : productsView === "list" ? (
          <ProductsList />
        ) : productsView === "grid" ? (
          <ProductsGrid />
        ) : null}
      </div>
    </>
  );
};

export default ProductsContainer;
