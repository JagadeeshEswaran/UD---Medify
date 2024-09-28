import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { axiosInstance, formatPrice, generateCountOptions } from "../Utils";
import {} from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../Features/cart/cartSlice";

const singleProdutQuery = (id) => {
  return {
    queryKey: ["singleProdut", id],
    queryFn: () => axiosInstance(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleProdutQuery(params.id)
    );
    const productData = response.data.data;

    return { productData };
  };

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productData } = useLoaderData();
  const { image, title, price, description, colors, company } =
    productData.attributes;
  const [productColor, setProductColors] = useState(colors[0]);
  const [productCount, setProductCount] = useState(1);
  const dollarsAmount = formatPrice(price);

  const handleCount = (e) => {
    setProductCount(parseInt(e.target.value));
  };

  const cartProduct = {
    cartId: productData.id + productColor,
    productId: productData.id,
    image,
    title,
    price,
    company,
    productColor,
    productCount,
  };

  const addToCart = () => dispatch(addItem({ product: cartProduct }));

  console.log("productData : ", productData);

  return (
    <>
      <section className="">
        <article className="text-md breadcrumbs">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </article>

        {/* PRODUCT */}
        <article className="grid mt-6 gap-y-8 lg:grid-cols-2 lg:gap-x-16">
          {/* IMAGE COLUMN */}
          <img
            src={image}
            alt={title}
            className="w-96 h-96 object-cover rounded-lg lg:w-full"
          />

          {/* DESCRIPTION COLUMN */}
          <article>
            <h1 className="capitalize text-3xl font-bold">{title}</h1>
            <h4 className="text-xl text-neutral-content font-bold mt-2">
              {company}
            </h4>

            <p className="mt-3 text-xl">{dollarsAmount}</p>

            <p className="mt-6 leading-8">{description}</p>

            {/* PRODUCT COLORS */}
            <article className="mt-6">
              <h4 className="text-md font-medium tracking-wider capitalize">
                colors
              </h4>

              <div className="mt-2">
                {colors.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      item === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: item }}
                    onClick={() => setProductColors(item)}
                  ></button>
                ))}
              </div>
            </article>

            {/* PRODUCT AMPOUNT OR COUNT */}
            <article className="mt-6 form-control w-full max-w-xs">
              <label htmlFor="count">
                <h4 className="text-md font-medium tracking-wider capitalize">
                  count
                </h4>
              </label>

              <select
                className="select select-secondary select-border select-md"
                name=""
                id="count"
                value={productCount}
                onChange={handleCount}
              >
                {generateCountOptions(5)}
              </select>

              <div className="mt-10">
                <button
                  className="btn btn-secondary btn-md"
                  onClick={() => addToCart()}
                >
                  Add to Bag
                </button>
              </div>
            </article>
          </article>
        </article>
      </section>
    </>
  );
};

export default SingleProduct;
