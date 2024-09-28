import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../Utils";
import {
  ComplexPaginationContainer,
  OrdersList,
  PaginationContainer,
  SectionTitle,
} from "../Components";

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      axiosInstance.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const { user } = store.getState().userState;

    if (!user) {
      toast.warn("You must logged in to View Orders");
      // return redirect("/login");
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );

      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error?.message ||
        "Error placing your order, Please try again";

      toast.error(errorMsg);

      if (error?.response?.status === 401 || 403) {
        return redirect("/login");
      }

      return null;
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();

  if (meta.pagination.total < 1) {
    <SectionTitle text="Please make an order" />;
  }

  return (
    <>
      <SectionTitle text="Your Orders" />

      <ComplexPaginationContainer position={"start"} />

      <OrdersList />

      {/* <PaginationContainer position="start" /> */}
    </>
  );
};

export default Orders;
