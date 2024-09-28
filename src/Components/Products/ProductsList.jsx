import React from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { formatPrice } from "../../Utils";

const ProductsList = () => {
  const productsData = useLoaderData();

  console.log(productsData.products);

  return (
    <>
      <section className="mt-8 grid gap-4 grid-y-8">
        {productsData.products.map((item) => (
          <Link
            key={item.id}
            to={`/products/${item.id}`}
            className="p-8 card flex flex-col sm:flex-row gap-4 flexwrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
          >
            <img
              src={item.attributes.image}
              alt=""
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
            />

            <div className="ml-0 sm:ml-16">
              <h3 className="capitalize font-medium text-lg">
                {item.attributes.title}
              </h3>
              <h4 className="capitalize text-md text-neutral-content">
                {item.attributes.company}
              </h4>
            </div>

            <p className="font-medium ml-0 sm:ml-auto">
              $ {item.attributes.price}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
};

export default ProductsList;
