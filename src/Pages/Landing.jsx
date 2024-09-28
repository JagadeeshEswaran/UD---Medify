import React from "react";
import { FeaturedProducts, Hero } from "../Components";
import { axiosInstance } from "../Utils";

const url = `/products?featured=true`;

const featuredProductsQuery = {
  queryKey: ["featuresProduct"],
  queryFn: () => axiosInstance(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = response?.data?.data;
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
