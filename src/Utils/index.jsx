import axios from "axios";

const backendURL = `https://strapi-store-server.onrender.com/api`;

export const axiosInstance = axios.create({ baseURL: backendURL });

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));

  return dollarsAmount;
};

export const generateCountOptions = (num) => {
  return Array.from({ length: num }, (_, idx) => {
    const count = idx + 1;

    return (
      <>
        <option key={count} value={count}>
          {count}
        </option>
      </>
    );
  });
};
