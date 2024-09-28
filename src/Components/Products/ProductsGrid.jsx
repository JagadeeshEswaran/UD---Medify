import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../../Utils/index";

const ProductsGrid = () => {
  const productsData = useLoaderData();

  // console.log(productsData.products[0]);

  return (
    <>
      <section className="pt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {productsData?.products?.map((item) => (
          <Link
            key={item.id}
            to={`/products/${item.id}`}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-150 pt-4"
          >
            <figure className="px-4 pt-2">
              <img
                src={item.attributes.image}
                alt=""
                className="rounded-xl h-64 md:g-48 w-full object-cover"
              />
            </figure>

            <div className="card-body items-center text-center">
              <h1 className="card-title capitalize tracking-wider">
                {item.attributes?.title}
              </h1>

              <span className="text-secondary">
                {/* $ {item.attributes.price / 100} */}

                {formatPrice(item.attributes.price)}
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};

export default ProductsGrid;
